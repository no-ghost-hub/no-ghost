import type { Block } from "payload";

const block: Block = {
  slug: "footerBlock",
  labels: {
    singular: "Footer block",
    plural: "Footer blocks",
  },
  interfaceName: "FooterBlock",
  fields: [
    {
      type: "tabs",
      tabs: [
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
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default block;
