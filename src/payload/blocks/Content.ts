import type { Block } from "payload";
import medium from "@/payload/fields/medium";
import textBlock from "@/payload/blocks/Text";
import quotesBlock from "@/payload/blocks/Quotes";
import footerBlock from "@/payload/blocks/Footer";

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
            {
              label: "Side medium",
              ...medium,
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
};

export default block;
