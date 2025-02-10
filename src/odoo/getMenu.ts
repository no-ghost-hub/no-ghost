import { odooQuery } from "@/utils/odooClient";

export default async function getMenu() {
  const { result: products } = await odooQuery({
    model: "product.product",
    method: "search_read",
    domain: [[["pos_categ_ids", "=", "Menu"]]],
    options: {
      fields: [
        "name",
        "image_1024",
        "list_price",
        "tax_string",
        "taxes_id",
        "public_description",
        "categ_id",
        "attribute_line_ids",
      ],
      order: "sequence asc",
    },
  });

  const categoriesIds = Array.from(
    new Set(products.map((p: any) => p.categ_id[0])),
  );

  const { result: categories } = await odooQuery({
    model: "product.category",
    method: "search_read",
    domain: [[["id", "in", categoriesIds]]],
    options: {
      fields: ["name"],
      order: "x_studio_sequence asc",
    },
  });

  const attributeLineIds = products.flatMap((p: any) => p.attribute_line_ids);

  const { result: attributeLines } = await odooQuery({
    model: "product.template.attribute.line",
    method: "search_read",
    domain: [[["id", "in", attributeLineIds]]],
    options: {
      fields: ["product_tmpl_id", "attribute_id", "display_name"],
      order: "sequence asc",
    },
  });

  const attributeIds = Array.from(
    new Set(attributeLines.map((l: any) => l.attribute_id[0])),
  );

  const { result: attributes } = await odooQuery({
    model: "product.attribute",
    method: "search_read",
    domain: [[["id", "in", attributeIds]]],
    options: {
      fields: ["display_type", "x_studio_muted"],
    },
  });

  const { result: options } = await odooQuery({
    model: "product.template.attribute.value",
    method: "search_read",
    domain: [[["product_tmpl_id", "in", products.map((p: any) => p.id)]]],
    options: {
      fields: ["name", "attribute_line_id", "price_extra"],
    },
  });

  const menu = categories.map(({ id, name }: any) => ({
    id,
    name,
    products: products
      .filter((p: any) => p.categ_id[0] === id)
      .map((p: any) => ({
        ...p,
        attributes: attributeLines
          .filter((l: any) => l.product_tmpl_id[0] === p.id)
          .map((l: any) => {
            const attribute = attributes.find(
              (a: any) => a.id === l.attribute_id[0],
            );
            return {
              id: l.id,
              name: l.display_name,
              muted: attribute?.x_studio_muted,
              type: attribute?.display_type,
              options: options.filter(
                (o: any) => o.attribute_line_id[0] === l.id,
              ),
            };
          }),
      })),
  }));

  return menu;
}
