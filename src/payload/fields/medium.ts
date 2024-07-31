import type { Field } from "payload";

export default {
  name: "medium",
  type: "group",
  fields: [
    {
      name: "medium",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "caption",
      type: "richText",
    },
  ],
} as Field;
