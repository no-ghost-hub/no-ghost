import type { GroupField } from "payload";

const field: GroupField = {
  name: "link",
  type: "group",
  fields: [
    {
      type: "row",
      fields: [
        {
          admin: {
            layout: "horizontal",
          },
          name: "type",
          type: "radio",
          defaultValue: "reference",
          options: [
            {
              label: "Internal",
              value: "reference",
            },
            {
              label: "Custom",
              value: "custom",
            },
          ],
        },
        {
          label: "Entry",
          name: "reference",
          type: "relationship",
          admin: {
            condition: (_, siblingData) => siblingData?.type === "reference",
          },
          relationTo: ["pages"],
        },
        {
          label: "URL",
          name: "url",
          type: "text",
          admin: {
            condition: (_, siblingData) => siblingData?.type === "custom",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          label: "Icon",
          name: "icon",
          type: "text",
        },
        {
          label: "Text",
          name: "text",
          type: "text",
        },
      ],
    },
  ],
};

export default field;
