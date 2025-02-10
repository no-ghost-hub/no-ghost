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
