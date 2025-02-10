import { odooQuery, odooOrder } from "@/utils/odooClient";
import { NextRequest, NextResponse } from "next/server";
import parsed from "@/utils/parsed";
import { attributesPrice, CartItem } from "@/stores/cart";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");

  let response;
  try {
    if (id) {
      response = await odooQuery({
        model: "pos.order.line",
        method: "search_read",
        domain: [[["order_id", "=", parseInt(id)]]],
        options: {
          fields: ["display_name", "qty"],
        },
      });
    } else {
      throw new Error("No order id provided");
    }
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }

  const { result: lines } = response;

  if (lines) {
    response.result = {
      lines: lines.map((line: any) => parsed(line, "orderLine")),
    };
  }

  return NextResponse.json(response);
}

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
        lines: lines.map(
          ({ productId, price, attributes, quantity, taxedPrice, tax }) => [
            0,
            0,
            {
              product_id: productId,
              price_unit: price + attributesPrice(attributes),
              price_extra: attributesPrice(attributes),
              price_subtotal: (price + attributesPrice(attributes)) * quantity,
              price_subtotal_incl:
                (taxedPrice +
                  attributesPrice(attributes) * (1 + tax.amount / 100)) *
                quantity,
              attribute_value_ids: attributes?.map(({ id }) => id),
              qty: quantity,
              tax_ids: [tax.id],
            },
          ],
        ),
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
