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
      type: "tabs",
      tabs: [
        {
          label: "Block",
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
        },
        {
          label: "Settings",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "controls",
                  label: "Controls",
                  type: "checkbox",
                  defaultValue: false,
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
