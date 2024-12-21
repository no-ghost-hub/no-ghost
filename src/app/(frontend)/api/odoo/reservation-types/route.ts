import { odooQuery } from "@/utils/odooClient";
import { NextResponse } from "next/server";
import parsed from "@/utils/parsed";

export async function GET() {
  let response;
  response = await odooQuery({
    model: "appointment.type",
    method: "search_read",
    options: {
      fields: [
        "resource_total_capacity",
        "id",
        "name",
        "x_studio_slug",
        "location",
      ],
    },
  });

  const { result: data } = response;

  if (data) {
    response.result = parsed(data, "reservationTypes");
  }

  return NextResponse.json(response);
}
