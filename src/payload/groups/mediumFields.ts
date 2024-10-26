import type { Field } from "payload";
import textFields from "@/payload/groups/textFields";

import imageBlock from "@/payload/blocks/Image";
import videoBlock from "@/payload/blocks/Video";

const fields = (caption: boolean = false): Field[] => [
  {
    name: "medium",
    type: "blocks",
    blocks: [imageBlock, videoBlock],
    maxRows: 1,
  },
  ...(caption ? textFields({ name: "caption", theme: "minimal" }) : []),
];

export default fields;
