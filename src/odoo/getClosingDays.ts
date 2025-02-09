import { odooQuery } from "@/utils/odooClient";
import parsed from "@/utils/parsed";

export default async function getClosingDays() {
  const json = await odooQuery({
    model: "resource.calendar.leaves",
    method: "search_read",
    options: { fields: ["date_from", "date_to"] },
    domain: [[["resource_id.x_studio_slug", "=", "no-ghost-01"]]],
  });

  json.result = parsed(json.result, "closingDays");

  const { result: data, ...rest } = json;
  return { data, ...rest };
}
