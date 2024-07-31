import type { GroupField } from "payload";
import image from "@/payload/fields/image";

const field: GroupField = {
  name: "video",
  type: "group",
  fields: [
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
  ],
};

export default field;
