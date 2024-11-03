import type { Block } from "payload";
import linkFields from "@/payload/groups/linkFields";

const block: Block = {
  slug: "linkBlock",
  labels: {
    singular: "Link block",
    plural: "Link blocks",
  },
  interfaceName: "LinkBlock",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Block",
          fields: linkFields,
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
