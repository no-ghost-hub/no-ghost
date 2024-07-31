import type { GroupField } from "payload";
import { lexicalHTML } from "@payloadcms/richtext-lexical";

import image from "@/payload/fields/image";
import video from "@/payload/fields/video";

const field: GroupField = {
  name: "medium",
  type: "group",
  fields: [
    {
      name: "medium",
      type: "blocks",
      blocks: [
        { slug: "imageBlock", fields: [image] },
        { slug: "videoBlock", fields: [video] },
      ],
      maxRows: 1,
    },
    {
      name: "caption",
      type: "richText",
    },
    lexicalHTML("caption", { name: "captionHTML" }),
  ],
};

export default field;
