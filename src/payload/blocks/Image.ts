import type { Block } from "payload";
import image from "@/payload/fields/image";

const block: Block = {
  slug: "imageBlock",
  labels: {
    singular: "Image block",
    plural: "Image blocks",
  },
  interfaceName: "ImageBlock",
  fields: [image],
};

export default block;
