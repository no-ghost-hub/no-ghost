import type { CollectionConfig } from "payload";
import textFields from "@/payload/groups/textFields";

const collection: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "alt",
          type: "text",
          required: true,
        },
        ...textFields({ name: "caption", theme: "minimal" }),
      ],
    },
  ],
  upload: true,
};

export default collection;
