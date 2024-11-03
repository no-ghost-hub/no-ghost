import type { Field } from "payload";
import image from "@/payload/fields/image";

const fields: Field[] = [
  {
    name: "src",
    type: "text",
    required: true,
  },
  {
    ...image,
    name: "poster",
  },
  {
    name: "ratio",
    type: "group",
    fields: [
      {
        type: "row",
        fields: [
          {
            name: "x",
            type: "number",
            required: true,
          },
          {
            name: "y",
            type: "number",
            required: true,
          },
        ],
      },
    ],
  },
];

export default fields;
