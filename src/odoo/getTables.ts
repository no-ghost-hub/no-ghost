import { odooQuery } from "@/utils/odooClient";
import parsed from "@/utils/parsed";

const getTables = async () => {
  const json = await odooQuery({
    model: "appointment.resource",
    method: "search_read",
    options: {
      fields: ["id", "name", "capacity"],
    },
    domain: [
      [["appointment_type_ids.x_studio_slug", "in", ["lunch", "dinner"]]],
    ],
  });

  json.result = parsed(json.result, "tables");

  return json;
};

export default getTables;
