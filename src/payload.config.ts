import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import Users from "@/payload/collections/Users";
import Media from "@/payload/collections/Media";
import Pages from "@/payload/collections/Pages";
import Subscribers from "@/payload/collections/Subscribers";
import Site from "@/payload/globals/Site";

export default buildConfig({
  admin: {
    user: "users",
    autoLogin:
      process.env.PAYLOAD_PUBLIC_ENABLE_AUTOLOGIN === "true"
        ? {
            email: "leonardi.gabriele.lg@gmail.com",
            password: "1234",
          }
        : false,
  },
  editor: lexicalEditor(),
  globals: [Site],
  collections: [Users, Pages, Media, Subscribers],
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || "",
    },
  }),
  plugins: [
    vercelBlobStorage({
      collections: {
        [Media.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
  sharp,
});
