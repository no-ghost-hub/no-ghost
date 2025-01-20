import { odooQuery } from "@/utils/odooClient";
import { NextRequest, NextResponse } from "next/server";
import { utcDate } from "@/utils/utcDate";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { guests, date, time, timeZone } = body;

  let response;
  response = await odooQuery({
    model: "appointment.booking.line",
    method: "search_read",
    options: {
      fields: ["appointment_resource_id"],
    },
    domain: [
      [
        ["appointment_type_id", "=", time?.type],
        ["event_start", "<", utcDate(`${date} ${time?.to}`, timeZone)],
        ["event_stop", ">", utcDate(`${date} ${time?.from}`, timeZone)],
      ],
    ],
  });

  response = await odooQuery({
    model: "appointment.resource",
    method: "search_read",
    options: {
      fields: ["capacity"],
    },
    domain: [
      [
        ["appointment_type_ids", "in", time?.type],
        [
          "id",
          "not in",
          response.result.map((r: any) => r.appointment_resource_id[0]),
        ],
      ],
    ],
  });

  const { result: data } = response;

  if (data) {
    response.result = data.filter((r: any) => r.capacity >= (guests || 0));
  }

  return NextResponse.json(response);
}
