"use server";

import { odooQuery } from "@/utils/odooClient";
import parsed from "@/utils/parsed";

const getDiscount = async (prevState: any, formData: FormData) => {
  const { code } = Object.fromEntries(formData);

  const [ruleJson, rewardsJson] = await Promise.all([
    odooQuery({
      model: "loyalty.rule",
      method: "search_read",
      domain: [
        [
          ["code", "=", code],
          ["active", "=", true],
        ],
      ],
      options: {
        fields: [
          "code",
          "valid_product_ids",
          "minimum_qty",
          "reward_point_amount",
        ],
      },
    }),
    odooQuery({
      model: "loyalty.reward",
      method: "search_read",
      domain: [
        [
          ["program_id.rule_ids.code", "=", code],
          ["active", "=", true],
        ],
      ],
      options: {
        fields: [
          "reward_product_id",
          "reward_product_qty",
          "required_points",
          "discount_line_product_id",
        ],
      },
    }),
  ]);

  ruleJson.result = {
    ...parsed(ruleJson.result[0], "discount"),
    rewards: rewardsJson.result.map((reward: any) => parsed(reward, "reward")),
  };

  const { result: data, ...rest } = ruleJson;

  return { data, ...rest };
};

export default getDiscount;
