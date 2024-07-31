import type { UploadField } from "payload";

const field: UploadField = {
  name: "image",
  type: "upload",
  relationTo: "media",
  filterOptions: {
    mimeType: { contains: "image" },
  },
};

export default field;
