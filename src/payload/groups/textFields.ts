import type { Field } from "payload";
import {
  HeadingFeature,
  lexicalEditor,
  lexicalHTML,
} from "@payloadcms/richtext-lexical";

const features: Record<string, any[]> = {
  default: [
    HeadingFeature({
      enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
    }),
  ],
};

const fields = ({ name = "text", theme = "default" } = {}): Field[] => [
  {
    name,
    type: "richText",
    editor: lexicalEditor({
      features: ({ rootFeatures }) => [
        ...rootFeatures,
        ...(features[theme] || []),
      ],
    }),
  },
  lexicalHTML(name, { name: `${name}HTML` }),
];

export default fields;
