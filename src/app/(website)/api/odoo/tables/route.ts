import { odooQuery } from "@/utils/odooClient";
import { NextResponse } from "next/server";
import parsed from "@/utils/parsed";

export async function GET() {
  let response;
  response = await odooQuery({
    model: "appointment.resource",
    method: "search_read",
    options: {
      fields: ["id", "name", "capacity"],
    },
    domain: [
      [["appointment_type_ids.x_studio_slug", "in", ["lunch", "dinner"]]],
    ],
  });

  const { result: data } = response;

  if (data) {
    response.result = parsed(data, "tables");
  }

  return NextResponse.json(response);
}
