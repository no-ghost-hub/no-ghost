import { NextResponse } from "next/server";

const endpoint = process.env.FOODICS_API_ENDPOINT;
const token = process.env.FOODICS_ACCESS_TOKEN;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const group = searchParams.get("group");

  let response = await fetch(`${endpoint}/groups?filter[name]=${group}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const { data: groupData } = await response.json();
  const groupId = groupData[0].id;

  response = await fetch(
    `${endpoint}/products?filter[groups.id]=${groupId}&include=groups,category`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  const { data: productsData } = await response.json();

  const data = productsData.reduce((acc: any, product: any) => {
    const { category } = product;
    let already = acc.find((c: any) => c.id === category.id);
    if (!already) {
      already = { ...category, products: [] };
      acc.push(already);
    }
    already.products.push(product);

    return acc;
  }, []);

  return NextResponse.json(data);
}
