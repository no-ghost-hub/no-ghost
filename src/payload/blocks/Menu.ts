import type { Block } from "payload";
import message from "@/payload/fields/message";

const block: Block = {
  slug: "menuBlock",
  labels: {
    singular: "Menu block",
    plural: "Menu blocks",
  },
  interfaceName: "MenuBlock",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Block",
          fields: [
            message(`Displays the UI elements for the restaurant's menu`),
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
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default block;
