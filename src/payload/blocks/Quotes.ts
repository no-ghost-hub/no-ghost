import type { Block } from "payload";

export default {
  slug: "quotesBlock",
  labels: {
    singular: "Quotes block",
    plural: "Quotes blocks",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Block",
          fields: [
            {
              label: "Quotes",
              name: "quotes",
              type: "relationship",
              relationTo: "quotes",
              hasMany: true,
            },
          ],
        },
        {
          label: "Settings",
          fields: [
            {
              type: "row",
              fields: [
                {
                  admin: {
                    width: "50%",
                  },
                  name: "theme",
                  label: "Theme",
                  type: "select",
                  options: [
                    {
                      label: "Default",
                      value: "default",
                    },
                  ],
                  defaultValue: "default",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
} as Block;
