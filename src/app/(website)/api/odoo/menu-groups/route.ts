import { odooQuery } from "@/utils/odooClient";
import { NextResponse } from "next/server";
import parsed from "@/utils/parsed";

export async function GET() {
  let response;
  response = await odooQuery({
    model: "pos.category",
    method: "search_read",
    options: {
      fields: ["name", "x_studio_slug", "hour_after", "hour_until", "color"],
    },
    domain: [[["x_studio_menu", "=", true]]],
  });

  const { result: data } = response;

  if (data) {
    response.result = data.map((group: any) => parsed(group, "menuGroup"));
  }

  return NextResponse.json(response);
}
