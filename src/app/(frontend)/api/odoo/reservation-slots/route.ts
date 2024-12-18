import { odooQuery } from "@/utils/odooClient";
import { NextResponse } from "next/server";
import parsed from "@/utils/parsed";

export async function GET() {
  let response;
  response = await odooQuery({
    model: "appointment.slot",
    method: "search_read",
    options: {
      // fields: ["currency_id"],
    },
    domain: [
      [
        "|",
        ["appointment_type_id", "in", "Lunch"],
        ["appointment_type_id", "in", "Dinner"],
      ],
    ],
  });

  const { result: data } = response;

  if (data) {
    response.result = parsed(data, "reservationDates");
  }

  return NextResponse.json(response);
}
