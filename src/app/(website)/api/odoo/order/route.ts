import { odooQuery, odooOrder } from "@/utils/odooClient";
import { NextRequest, NextResponse } from "next/server";
import parsed from "@/utils/parsed";
import { CartItem } from "@/stores/cart";

export async function POST(request: NextRequest) {
  const body: { table: string; lines: CartItem[] } = await request.json();
  const { table, lines } = body;

  let response: any;

  try {
    const [
      {
        result: [posData],
      },
      {
        result: [tableData],
      },
    ] = await Promise.all([
      odooQuery({
        model: "pos.config",
        method: "search_read",
        options: {
          fields: ["access_token"],
          domain: [["self_ordering_mode", "=", "mobile"]],
        },
      }),
      odooQuery({
        model: "restaurant.table",
        method: "search_read",
        options: {
          fields: ["id", "identifier"],
          domain: [["table_number", "=", table]],
        },
      }),
    ]);

    response = await odooOrder({
      token: posData.access_token,
      table: tableData.identifier,
      order: {
        table_id: tableData.id,
        company_id: 1,
        session_id: 1,
        amount_tax: 0,
        amount_total: 0,
        amount_paid: 0,
        amount_return: 0,
        customer_count: 1,
        lines: lines.map((line) => [
          0,
          0,
          {
            product_id: line.id,
            price_unit: line.price,
            price_subtotal: line.price * line.quantity,
            price_subtotal_incl: line.taxedPrice * line.quantity,
            attribute_value_ids: line.attributes,
            qty: line.quantity,
            tax_ids: [line.taxId],
          },
        ]),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }

  const { result: data } = response;

  if (data) {
    response.result = parsed(data, "order");
  }

  return NextResponse.json(response);
}
