import type { CollectionConfig } from "payload";
import link from "@/payload/fields/link";

const collection: CollectionConfig = {
  slug: "menus",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
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
                  admin: {
                    width: "50%",
                  },
                  name: "slug",
                  label: "Slug",
                  type: "text",
                  required: true,
                },
              ],
            },
            {
              name: "items",
              label: "Items",
              type: "array",
              fields: [link],
            },
          ],
        },
      ],
    },
  ],
};

export default collection;
