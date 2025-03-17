import type { CollectionConfig } from "payload";
import logoBlock from "@/payload/blocks/Logo";
import contentBlock from "@/payload/blocks/Content";
import promotionBlock from "@/payload/blocks/Promotion";

const collection: CollectionConfig = {
  slug: "promotions",
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
          label: "Promotion",
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
              blocks: [logoBlock, contentBlock, promotionBlock],
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
};

export default collection;
