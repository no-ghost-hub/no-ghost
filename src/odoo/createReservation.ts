"use server";

import { odooQuery } from "@/utils/odooClient";
import { Reservation } from "@/types";
import { utcDate } from "@/utils/utcDate";
import delay from "@/utils/delay";

const ids: Record<string, number> = {
  client: 2,
  marketing: 3,
  noGhost01Location: 1,
};

const createReservation = async (reservation: Reservation) => {
  const { guests, date, time, timeZone, location, info } = reservation;

  let response: any;

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
          x_studio_first_name: info?.firstName,
          x_studio_last_name: info?.lastName,
          name: `${info?.firstName} ${info?.lastName}`,
          email: info?.email,
          phone: info?.phone,
          category_id: [
            [4, ids.client],
            ...(info?.marketing ? [[4, ids.marketing]] : []),
          ],
        },
      ],
    });
  }

  const calendarResponse = await odooQuery({
    model: "calendar.event",
    method: "create",
    domain: [
      {
        name: `${info?.firstName} ${info?.lastName} - Reservation`,
        description: info?.message,
        start: utcDate(`${date} ${time?.from}`, timeZone),
        stop: utcDate(`${date} ${time?.to}`, timeZone),
        location,
        appointment_type_id: time?.type,
        partner_ids: [[4, response.result]],
        resource_total_capacity_reserved: guests,
      },
    ],
  });

  response = await odooQuery({
    model: "appointment.booking.line",
    method: "search_read",
    options: {
      fields: ["appointment_resource_id"],
    },
    domain: [
      [
        ["appointment_type_id", "=", time?.type],
        ["event_start", "<", utcDate(`${date} ${time?.to}`)],
        ["event_stop", ">", utcDate(`${date} ${time?.from}`)],
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

  const resource = response.result
    .filter((r: any) => r.capacity >= (guests || 0))
    .reduce((closest: any, current: any) =>
      Math.abs(current.capacity - (guests || 0)) <
      Math.abs(closest.capacity - (guests || 0))
        ? current
        : closest,
    );

  const json = await odooQuery({
    model: "appointment.booking.line",
    method: "create",
    domain: [
      {
        appointment_type_id: time?.type,
        appointment_resource_id: resource.id,
        capacity_reserved: guests,
        calendar_event_id: calendarResponse.result,
      },
    ],
  });

  return { ...json, data: reservation };
};

export default createReservation;
