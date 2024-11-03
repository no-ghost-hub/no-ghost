import type { Block } from "payload";
import message from "@/payload/fields/message";

const block: Block = {
  slug: "reserveBlock",
  labels: {
    singular: "Reserve block",
    plural: "Reserve blocks",
  },
  interfaceName: "ReserveBlock",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Block",
          fields: [message(`Displays the UI elements for reserving`)],
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
