import { GlobalConfig } from "payload";
import medium from "@/payload/fields/medium";

const global: GlobalConfig = {
  label: "Site",
  slug: "site",
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
      label: "Social image",
      ...medium,
    },
  ],
};

export default global;
