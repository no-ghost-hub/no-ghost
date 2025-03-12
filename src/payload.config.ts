import sharp from "sharp";
import {
  HTMLConverterFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
  ParagraphFeature,
} from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import Users from "@/payload/collections/Users";
import Media from "@/payload/collections/Media";
import Pages from "@/payload/collections/Pages";
import Promotions from "@/payload/collections/Promotions";
import Menus from "@/payload/collections/Menus";
import Site from "@/payload/globals/Site";
import Footer from "@/payload/globals/Footer";
import Strings from "@/payload/globals/Strings";

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
      LinkFeature(),
      InlineToolbarFeature(),
      HTMLConverterFeature(),
    ],
  }),
  globals: [Site, Footer, Strings],
  collections: [Users, Pages, Promotions, Media, Menus],
  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.MONGODB_URL || "",
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
});
