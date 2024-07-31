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
                  admin: {
                    width: "50%",
                  },
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
              type: "row",
              fields: [
                {
                  admin: {
                    width: "50%",
                  },
                  name: "role",
                  label: "Role",
                  type: "text",
                  required: true,
                },
                {
                  admin: {
                    width: "50%",
                  },
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
