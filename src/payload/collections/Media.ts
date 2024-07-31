import type { CollectionConfig } from "payload";

const collection: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "richText",
    },
  ],
  upload: true,
};

export default collection;
