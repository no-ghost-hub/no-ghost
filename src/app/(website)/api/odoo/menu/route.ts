import { odooQuery } from "@/utils/odooClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const groupSlug = searchParams.get("group");

  let response: { result: any[] };
  response = await odooQuery({
    model: "pos.category",
    method: "search_read",
    domain: [[["x_studio_slug", "=", groupSlug]]],
    options: {
      fields: ["id"],
    },
  });

  const { result: groupData } = response;

  if (groupData && groupData.length) {
    const groupId = groupData[0].id;

    response = await odooQuery({
      model: "product.product",
      method: "search_read",
      domain: [[["pos_categ_ids", "in", groupId]]],
      options: {
        fields: [
          "id",
          "sequence",
          "name",
          "image_1024",
          "list_price",
          "tax_string",
          "taxes_id",
          "public_description",
          "categ_id",
        ],
        order: "sequence asc",
      },
    });

    const { result: productsData } = response;

    const categories: Record<string, any> = {};
    response.result = await Promise.all(
      productsData.map(async (product) => {
        const { categ_id } = product;
        if (!categories[categ_id]) {
          const { result: categoryData } = await odooQuery({
            model: "product.category",
            method: "search_read",
            domain: [[["id", "=", categ_id[0]]]],
            options: {
              fields: ["id", "name", "x_studio_sequence"],
            },
          });
          categories[categ_id] = categoryData[0];
        }
        return { ...product, category: categories[categ_id] };
      }),
    );

    response.result = response.result
      .reduce<any[]>((acc, product) => {
        const {
          category: { id, name, x_studio_sequence },
        } = product;

        let already = acc.find((c: any) => c.id === id);
        if (!already) {
          already = { id, name, sequence: x_studio_sequence, products: [] };
          acc.push(already);
        }
        already.products.push(product);

        return acc;
      }, [])
      .sort((a, b) => a.sequence - b.sequence);
  }

  return NextResponse.json(response);
}
