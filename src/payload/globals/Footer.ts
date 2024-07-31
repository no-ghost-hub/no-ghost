import { GlobalConfig } from "payload";

const global: GlobalConfig = {
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
};

export default global;
