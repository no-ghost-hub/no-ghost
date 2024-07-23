import type { Block } from "payload";

export default {
  slug: "textBlock",
  labels: {
    singular: "Text block",
    plural: "Text blocks",
  },
  fields: [
    {
      name: "text",
      type: "richText",
    },
  ],
} as Block;
