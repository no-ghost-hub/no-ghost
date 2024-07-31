import type { CollectionConfig } from "payload";
import medium from "@/payload/fields/medium";

const collection: CollectionConfig = {
  slug: "quotes",
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
          label: "Quote",
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
            {
              type: "row",
              fields: [
                {
                  name: "role",
                  label: "Role",
                  type: "text",
                  required: true,
                },
                {
                  name: "age",
                  label: "Age",
                  type: "number",
                  required: true,
                },
              ],
            },
            {
              name: "quote",
              label: "Quote",
              type: "textarea",
              required: true,
            },
            medium,
          ],
        },
      ],
    },
  ],
};

export default collection;
