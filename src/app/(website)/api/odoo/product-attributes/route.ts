import { ProductAttribute } from "@/types";
import { odooQuery } from "@/utils/odooClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
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

    const { result: linesData } = response;

    const lines: ProductAttribute[] = [];

    const delay = (ms: number = 200) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    for (const line of linesData) {
      const { attribute_id, product_template_value_ids } = line;
      const id = attribute_id[0];
      const name = attribute_id[1];

      const { result: attributeData } = await odooQuery({
        model: "product.attribute",
        method: "search_read",
        domain: [[["id", "=", id]]],
        options: {
          fields: ["x_studio_muted"],
        },
      });

      await delay();

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
        muted: attributeData[0]?.x_studio_muted,
        options: valuesData.map((value: any) => ({
          id: value.id,
          name: value.name,
          price: value.price_extra,
        })),
      });

      await delay();
    }
    response.result = lines;
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }

  return NextResponse.json(response);
}
