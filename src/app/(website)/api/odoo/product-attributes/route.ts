import { odooQuery } from "@/utils/odooClient";
import { NextRequest, NextResponse } from "next/server";
import parsed from "@/utils/parsed";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  let response: { result: any[] };

  try {
    response = await odooQuery({
      model: "product.template.attribute.value",
      method: "search_read",
      options: {
        fields: ["id", "name", "price_extra", "attribute_line_id"],
      },
      domain: [[["product_tmpl_id", "=", parseInt(id || "")]]],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }

  const { result: data } = response;

  response.result = Object.values(
    data.reduce((acc, item) => {
      const id = item.attribute_line_id[0];
      const name = item.attribute_line_id[1];

      if (!acc[id]) {
        acc[id] = {
          id,
          name,
          options: [],
        };
      }
      acc[id].options.push({
        id: item.id,
        name: item.name,
        price: item.price_extra,
      });
      return acc;
    }, {}),
  );

  return NextResponse.json(response);
}
