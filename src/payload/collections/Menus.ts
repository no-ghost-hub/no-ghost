import type { CollectionConfig } from "payload";
import linkBlock from "@/payload/blocks/Link";
import menuBlock from "@/payload/blocks/Menu";
import orderBlock from "@/payload/blocks/Order";
import reserveBlock from "@/payload/blocks/Reserve";

const collection: CollectionConfig = {
  slug: "menus",
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
          label: "Menu",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "title",
                  label: "Name",
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
          label: "Items",
          fields: [
            {
              name: "items",
              label: "Items",
              type: "blocks",
              blocks: [linkBlock, menuBlock, orderBlock, reserveBlock],
            },
          ],
        },
      ],
    },
  ],
};

export default collection;
