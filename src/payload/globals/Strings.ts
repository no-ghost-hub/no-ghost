import { GlobalConfig } from "payload";

const global: GlobalConfig = {
  label: "Strings",
  slug: "strings",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "strings",
      label: "Strings",
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "key",
              label: "Key",
              type: "text",
              required: true,
            },
            {
              name: "value",
              label: "Value",
              type: "text",
              required: true,
            },
          ],
        },
      ],
      admin: {
        components: {
          RowLabel: "@/payload/components/StringLabel",
        },
      },
    },
  ],
};

export default global;
