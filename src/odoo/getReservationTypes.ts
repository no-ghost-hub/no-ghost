import { odooQuery } from "@/utils/odooClient";
import parsed from "@/utils/parsed";

export default async function getReservationTypes() {
  const json = await odooQuery({
    model: "appointment.type",
    method: "search_read",
    options: {
      fields: [
        "resource_total_capacity",
        "id",
        "name",
        "x_studio_slug",
        "location",
        "appointment_tz",
      ],
    },
  });

  json.result = parsed(json.result, "reservationTypes");

  return json;
}
