import { odooQuery } from "@/utils/odooClient";
import parsed from "@/utils/parsed";

const getTables = async () => {
  const json = await odooQuery({
    model: "appointment.resource",
    method: "search_read",
    options: { fields: ["capacity"] },
    domain: [[["appointment_type_ids.x_studio_slug", "in", ["dinner"]]]],
  });

  json.result = parsed(json.result, "tables");

  const { result: data, ...rest } = json;
  return { data, ...rest };
};

export default getTables;
