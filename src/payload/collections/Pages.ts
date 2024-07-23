import type { CollectionConfig } from "payload";
import { slugField } from "@/payload/fields/slug";
import textBlock from "@/payload/blocks/Text";

export default {
  slug: "pages",
  admin: {},
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Page",
          fields: [
            {
              type: "row",
              fields: [
                {
                  admin: {
                    width: "50%",
                  },
                  name: "title",
                  label: "Title",
                  type: "text",
                  required: true,
                },
                // {
                //   admin: {
                //     width: "50%",
                //   },
                //   ...slugField(),
                // },
              ],
            },
          ],
        },
        {
          label: "Blocks",
          fields: [
            {
              name: "blocks",
              label: "Blocks",
              type: "blocks",
              blocks: [textBlock],
              required: true,
            },
          ],
        },
        {
          name: "meta",
          label: "SEO",
          fields: [],
        },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
} as CollectionConfig;
