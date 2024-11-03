import type { Block } from "payload";
import textFields from "@/payload/groups/textFields";
import linkFields from "@/payload/groups/linkFields";
import mediumFields from "@/payload/groups/mediumFields";

const block: Block = {
  slug: "contentBlock",
  labels: {
    singular: "Content block",
    plural: "Content blocks",
  },
  interfaceName: "ContentBlock",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Block",
          fields: [
            ...textFields(),
            ...mediumFields(),
            {
              name: "links",
              label: "Links",
              interfaceName: "LinksBlock",
              type: "array",
              fields: linkFields,
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
                    {
                      label: "Fit",
                      value: "fit",
                    },
                    {
                      label: "Full",
                      value: "full",
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
