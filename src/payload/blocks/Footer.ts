import type { Block } from "payload";

export default {
  slug: "footerBlock",
  labels: {
    singular: "Footer block",
    plural: "Footer blocks",
  },
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
                  admin: {
                    width: "50%",
                  },
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
} as Block;
