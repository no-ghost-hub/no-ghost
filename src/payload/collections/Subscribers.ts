import type { CollectionConfig } from "payload";

export default {
  slug: "subscribers",
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "group",
      fields: [
        {
          name: "first",
          label: "First",
          type: "text",
          required: true,
        },
        {
          name: "middle",
          label: "Middle",
          type: "text",
        },
        {
          name: "last",
          label: "Last",
          type: "text",
          required: true,
        },
      ],
    },
  ],
} as CollectionConfig;
