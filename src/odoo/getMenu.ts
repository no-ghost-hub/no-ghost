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
      ],
      order: "sequence asc",
    },
  });

  const categoriesIds = Array.from(
    new Set(products.map((product: any) => product.categ_id[0])),
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

  const menu = categories.map(({ id, name }: any) => ({
    id,
    name,
    products: products.filter((product: any) => product.categ_id[0] === id),
  }));

  return menu;
}
