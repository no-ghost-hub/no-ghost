import type { Field } from "payload";

const fields: Field[] = [
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
        label: "Text",
        name: "text",
        type: "text",
      },
    ],
  },
];

export default fields;
