import type { Field } from "payload";

const field: Field = {
  name: "link",
  type: "group",
  fields: [
    {
      type: "row",
      fields: [
        {
          admin: {
            layout: "horizontal",
            width: "50%",
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
            width: "50%",
            condition: (_, siblingData) => siblingData?.type === "reference",
          },
          relationTo: ["pages"],
        },
        {
          label: "URL",
          name: "url",
          type: "text",
          admin: {
            width: "50%",
            condition: (_, siblingData) => siblingData?.type === "custom",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          admin: {
            width: "50%",
          },
          label: "Icon",
          name: "icon",
          type: "text",
        },
        {
          admin: {
            width: "50%",
          },
          label: "Text",
          name: "text",
          type: "text",
        },
      ],
    },
  ],
};

export default field;
