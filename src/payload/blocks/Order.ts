import type { Block } from "payload";
import message from "@/payload/fields/message";

const block: Block = {
  slug: "orderBlock",
  labels: {
    singular: "Order block",
    plural: "Order blocks",
  },
  interfaceName: "OrderBlock",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Block",
          fields: [message(`Displays the UI elements for ordering`)],
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
