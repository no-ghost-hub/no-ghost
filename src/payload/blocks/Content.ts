import type { Block } from "payload";
import medium from "@/payload/fields/medium";
import textBlock from "@/payload/blocks/Text";
import quotesBlock from "@/payload/blocks/Quotes";
import footerBlock from "@/payload/blocks/Footer";

export default {
  slug: "contentBlock",
  labels: {
    singular: "Content block",
    plural: "Content blocks",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Block",
          fields: [
            {
              ...medium,
              label: "Side medium",
            },
            {
              name: "blocks",
              label: "Blocks",
              type: "blocks",
              blocks: [textBlock, quotesBlock, footerBlock],
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
                    {
                      label: "Full",
                      value: "full",
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
