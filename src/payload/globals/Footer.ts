import { GlobalConfig } from "payload";
import textFields from "@/payload/groups/textFields";

const global: GlobalConfig = {
  label: "Footer",
  slug: "footer",
  access: {
    read: () => true,
  },
  fields: [...textFields()],
};

export default global;
