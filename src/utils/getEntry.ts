import { CollectionSlug, getPayload } from "payload";
import config from "@payload-config";

import parsed from "@/utils/parsed";

const getEntry = async (type: CollectionSlug, slug: string) => {
  const payload = await getPayload({ config });
  const rawData = await payload.find({
    collection: type,
    where: { slug: { equals: slug } },
  });

  const data = parsed(rawData.docs[0], type);

  return data;
};

export default getEntry;
