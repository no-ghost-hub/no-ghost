import type { CollectionConfig } from "payload";
import contentBlock from "@/payload/blocks/Content";

const collection: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
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
                  name: "title",
                  label: "Title",
                  type: "text",
                  required: true,
                },
                {
                  name: "slug",
                  label: "Slug",
                  type: "text",
                  required: true,
                },
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
              blocks: [contentBlock],
            },
          ],
        },
        // {
        //   name: "meta",
        //   label: "SEO",
        //   fields: [],
        // },
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
};

export default collection;
