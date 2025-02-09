import { odooQuery } from "@/utils/odooClient";
import parsed from "@/utils/parsed";

export default async function getReservationSlots() {
  const json = await odooQuery({
    model: "appointment.slot",
    method: "search_read",
    options: {
      fields: ["weekday", "start_hour", "end_hour", "appointment_type_id"],
    },
    domain: [
      [["appointment_type_id.x_studio_slug", "in", ["lunch", "dinner"]]],
    ],
  });

  json.result = parsed(json.result, "reservationSlots");

  const { result: data, ...rest } = json;
  return { data, ...rest };
}
