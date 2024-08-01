import { GlobalConfig } from "payload";

const global: GlobalConfig = {
  label: "Footer",
  slug: "footer",
  access: {
    read: () => true,
  },
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
