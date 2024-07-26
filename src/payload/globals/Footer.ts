import { GlobalConfig } from "payload";

export default {
  label: "Footer",
  slug: "footer",
  fields: [
    {
      name: "menus",
      type: "relationship",
      relationTo: ["menus"],
      hasMany: true,
    },
  ],
} as GlobalConfig;
