import type { Block } from "payload";
import mediumFields from "@/payload/groups/mediumFields";

const block: Block = {
  slug: "logoBlock",
  labels: {
    singular: "Logo block",
    plural: "Logo blocks",
  },
  interfaceName: "LogoBlock",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Block",
          fields: mediumFields(),
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
