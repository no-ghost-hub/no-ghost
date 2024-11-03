import type { UIField } from "payload";

const field = (message: string): UIField => ({
  name: "message",
  type: "ui",
  admin: {
    components: {
      Field: {
        serverProps: {
          message,
        },
        path: "@/payload/components/MessageField",
      },
    },
  },
});

export default field;
