import type { Block } from "payload";
import image from "@/payload/fields/image";

const block: Block = {
  slug: "videoBlock",
  labels: {
    singular: "Video block",
    plural: "Video blocks",
  },
  interfaceName: "VideoBlock",
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

export default block;
