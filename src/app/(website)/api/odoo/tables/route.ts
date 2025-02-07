import { odooQuery } from "@/utils/odooClient";
import { NextResponse } from "next/server";
import parsed from "@/utils/parsed";

export async function GET() {
  let response;

  try {
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
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }

  const { result: data } = response;

  if (data) {
    response.result = parsed(data, "tables");
  }

  return NextResponse.json(response);
}
