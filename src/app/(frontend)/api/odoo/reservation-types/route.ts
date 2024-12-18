import { odooQuery } from "@/utils/odooClient";
import { NextResponse } from "next/server";
import parsed from "@/utils/parsed";

export async function GET() {
  let response;
  response = await odooQuery({
    model: "appointment.type",
    method: "search_read",
    options: {
      // fields: ["currency_id"],
    },
  });

  const { result: data } = response;

  if (data) {
    response.result = parsed(data, "reservationTypes");
  }

  return NextResponse.json(response);
}
