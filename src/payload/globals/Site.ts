import { GlobalConfig } from "payload";
import image from "@/payload/fields/image";

const global: GlobalConfig = {
  label: "Site",
  slug: "site",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          label: "Site name",
          name: "title",
          type: "text",
          required: true,
        },
        {
          label: "Home page",
          name: "home",
          type: "relationship",
          relationTo: ["pages"],
          hasMany: false,
          required: true,
        },
      ],
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
    },
    {
      ...image,
      label: "Social image",
    },
  ],
};

export default global;
