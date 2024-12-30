import { odooQuery } from "@/utils/odooClient";
import { NextRequest, NextResponse } from "next/server";
import parsed from "@/utils/parsed";
import { Reservation } from "@/types";

export async function GET() {
  let response;
  response = await odooQuery({
    model: "appointment.booking.line",
    method: "search_read",
    options: {
      fields: ["event_start", "event_stop", "capacity_reserved"],
    },
  });

  const { result: data } = response;

  if (data) {
    response.result = parsed(data, "reservations");
  }

  return NextResponse.json(response);
}

const customFields: Record<string, string> = {
  firstName: "x_studio_char_field_3cl_1iep3d50v",
  lastName: "x_studio_last_name",
};
const ids: Record<string, number> = {
  client: 2,
  marketing: 3,
  noGhost01Capacity: 19,
  noGhost01Location: 1,
};

export async function POST(request: NextRequest) {
  const body: Reservation = await request.json();
  const { guests, date, time, timeZone, location, info } = body;

  let response: any;

  try {
    response = await odooQuery({
      model: "res.partner",
      method: "search_read",
      domain: [[["email", "=", info?.email]]],
      options: {
        fields: ["id"],
      },
    });

    if (response.result.length) {
      response.result = response.result[0].id;
    } else {
      response = await odooQuery({
        model: "res.partner",
        method: "create",
        domain: [
          {
            [customFields.firstName]: info?.firstName,
            [customFields.lastName]: info?.lastName,
            name: `${info?.firstName} ${info?.lastName}`,
            email: info?.email,
            phone: info?.phone,
            category_id: [
              [4, ids.client],
              ...(info?.marketing === "subscribe" ? [[4, ids.marketing]] : []),
            ],
          },
        ],
      });
    }

    const utcDate = (dateString: string) => {
      const date = new Date(dateString);
      const zonedDate = new Date(date.toLocaleString("en-US", { timeZone }));
      return zonedDate.toISOString().replace("T", " ").slice(0, -5);
    };

    response = await odooQuery({
      model: "calendar.event",
      method: "create",
      domain: [
        {
          name: `${info?.firstName} ${info?.lastName} - Reservation`,
          description: info?.message,
          start: utcDate(`${date} ${time?.from}`),
          stop: utcDate(`${date} ${time?.to}`),
          location,
          appointment_type_id: time?.type,
          partner_ids: [[4, response.result]],
          resource_total_capacity_reserved: guests,
        },
      ],
    });

    response = await odooQuery({
      model: "appointment.booking.line",
      method: "create",
      domain: [
        {
          appointment_type_id: time?.type,
          appointment_resource_id: ids.noGhost01Capacity,
          capacity_reserved: guests,
          calendar_event_id: response.result,
        },
      ],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }

  return NextResponse.json({ result: body });
}
