import type { Block } from "payload";
import { odooQuery } from "@/utils/odooClient";

const { result } = await odooQuery({
  model: "loyalty.rule",
  method: "search_read",
  domain: [
    [
      ["active", "=", true],
      ["program_type", "=", "promo_code"],
    ],
  ],
  options: {
    fields: ["program_id", "code"],
  },
});

const block: Block = {
  slug: "promotionBlock",
  labels: {
    singular: "Promotion block",
    plural: "Promotion blocks",
  },
  interfaceName: "PromotionBlock",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Block",
          fields: [
            {
              name: "promotion",
              label: "Promotion",
              type: "select",
              options: result.map(({ program_id, code }: any) => ({
                label: program_id[1],
                value: code,
              })),
            },
          ],
        },
        {
          label: "Settings",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "theme",
                  label: "Theme",
                  type: "select",
                  options: [
                    {
                      label: "Default",
                      value: "default",
                    },
                  ],
                  defaultValue: "default",
                },
                {
                  name: "background",
                  label: "Background",
                  type: "select",
                  options: [
                    {
                      label: "Default",
                      value: "default",
                    },
                    {
                      label: "Orange",
                      value: "orange",
                    },
                    {
                      label: "Blue",
                      value: "blue",
                    },
                    {
                      label: "None",
                      value: "none",
                    },
                  ],
                  defaultValue: "default",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default block;
