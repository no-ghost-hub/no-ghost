import { odooQuery } from "@/utils/odooClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  let response: { result: any[] };

  try {
    response = await odooQuery({
      model: "product.template.attribute.line",
      method: "search_read",
      options: {
        fields: ["attribute_id", "product_template_value_ids"],
        order: "sequence asc",
      },
      domain: [[["product_tmpl_id", "=", parseInt(id || "")]]],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }

  const { result: linesData } = response;

  const lines: {
    id: number;
    name: string;
    options: { id: number; name: string; price: number };
  }[] = [];

  await Promise.all(
    linesData.map(async (line) => {
      const { attribute_id, product_template_value_ids } = line;
      const id = attribute_id[0];
      const name = attribute_id[1];

      const { result: valuesData } = await odooQuery({
        model: "product.template.attribute.value",
        method: "search_read",
        domain: [[["id", "in", product_template_value_ids]]],
        options: {
          fields: ["id", "name", "price_extra"],
        },
      });
      lines.push({
        id,
        name,
        options: valuesData.map((value: any) => ({
          id: value.id,
          name: value.name,
          price: value.price_extra,
        })),
      });
    }),
  );

  response.result = lines;

  return NextResponse.json(response);
}
