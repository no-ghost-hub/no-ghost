import { odooQuery } from "@/utils/odooClient";
import parsed from "@/utils/parsed";

const getPromotion = async (code: string) => {
  const json = await odooQuery({
    model: "loyalty.program",
    method: "search_read",
    options: { fields: ["total_order_count", "max_usage"] },
    domain: [
      [
        ["rule_ids.code", "=", code],
        ["active", "=", true],
      ],
    ],
  });

  json.result = parsed(json.result[0], "promotion");

  const { result: data, ...rest } = json;
  return { data, ...rest };
};

export default getPromotion;
