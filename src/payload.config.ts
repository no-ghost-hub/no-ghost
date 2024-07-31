import sharp from "sharp";
import {
  HTMLConverterFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  ParagraphFeature,
} from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import Users from "@/payload/collections/Users";
import Media from "@/payload/collections/Media";
import Pages from "@/payload/collections/Pages";
import Quotes from "@/payload/collections/Quotes";
import Subscribers from "@/payload/collections/Subscribers";
import Menus from "@/payload/collections/Menus";
import Site from "@/payload/globals/Site";
import Footer from "@/payload/globals/Footer";

export default buildConfig({
  // admin: {
  //   user: "users",
  //   autoLogin:
  //     process.env.PAYLOAD_PUBLIC_ENABLE_AUTOLOGIN === "true"
  //       ? {
  //           email: "leonardi.gabriele.lg@gmail.com",
  //           password: "1234",
  //         }
  //       : false,
  // },
  editor: lexicalEditor({
    features: () => [
      ParagraphFeature(),
      ItalicFeature(),
      LinkFeature(),
      InlineToolbarFeature(),
      HTMLConverterFeature(),
    ],
  }),
  globals: [Site, Footer],
  collections: [Users, Pages, Media, Quotes, Menus],
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    push: true,
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
  typescript: {
    outputFile: "./src/payload-types.ts",
  },
  // graphQL: {
  //   maxComplexity: 100,
  // },
});
