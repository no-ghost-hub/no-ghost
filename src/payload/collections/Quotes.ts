import type { CollectionConfig } from "payload";
import image from "@/payload/fields/image";

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
            image,
          ],
        },
      ],
    },
  ],
};

export default collection;
