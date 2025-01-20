import { getPayload, GlobalSlug } from "payload";
import config from "@payload-config";

import parsed from "@/utils/parsed";

const getGlobal = async (type: GlobalSlug) => {
  const payload = await getPayload({ config });
  const rawData = await payload.findGlobal({
    slug: type,
  });

  const data = parsed(rawData, type);

  return data;
};

export default getGlobal;
