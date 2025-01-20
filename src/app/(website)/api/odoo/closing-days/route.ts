import { odooQuery } from "@/utils/odooClient";
import { NextResponse } from "next/server";
import parsed from "@/utils/parsed";

export async function GET() {
  let response;
  response = await odooQuery({
    model: "resource.calendar.leaves",
    method: "search_read",
    options: {
      fields: ["date_from", "date_to"],
    },
    domain: [[["resource_id.x_studio_slug", "=", "no-ghost-01"]]],
  });

  const { result: data } = response;

  if (data) {
    response.result = parsed(data, "closingDays");
  }

  return NextResponse.json(response);
}
