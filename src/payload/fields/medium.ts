import type { GroupField } from "payload";
import {
  HTMLConverterFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  lexicalHTML,
  ParagraphFeature,
} from "@payloadcms/richtext-lexical";

const field: GroupField = {
  name: "medium",
  type: "group",
  fields: [
    {
      name: "medium",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "caption",
      type: "richText",
    },
    lexicalHTML("caption", { name: "captionHTML" }),
  ],
};

export default field;
