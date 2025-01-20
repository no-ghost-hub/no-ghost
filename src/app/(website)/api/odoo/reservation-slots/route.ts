import { odooQuery } from "@/utils/odooClient";
import { NextResponse } from "next/server";
import parsed from "@/utils/parsed";

export async function GET() {
  let response;
  response = await odooQuery({
    model: "appointment.slot",
    method: "search_read",
    options: {
      fields: ["weekday", "start_hour", "end_hour", "appointment_type_id"],
    },
    domain: [
      [["appointment_type_id.x_studio_slug", "in", ["lunch", "dinner"]]],
    ],
  });

  const { result: data } = response;

  if (data) {
    response.result = parsed(data, "reservationDates");
  }

  return NextResponse.json(response);
}
