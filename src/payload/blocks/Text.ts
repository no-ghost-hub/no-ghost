import {
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  ParagraphFeature,
} from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export default {
  slug: "textBlock",
  labels: {
    singular: "Text block",
    plural: "Text blocks",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Block",
          fields: [
            {
              name: "text",
              type: "richText",
              editor: lexicalEditor({
                features: () => [
                  ParagraphFeature(),
                  HeadingFeature(),
                  ItalicFeature(),
                  InlineToolbarFeature(),
                ],
              }),
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
