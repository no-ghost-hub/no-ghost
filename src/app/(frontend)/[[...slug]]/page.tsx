import getEntry from "@/utils/getEntry";

import Blocks from "@/components/Blocks";
import type { Page as PageType } from "@/payload-types";

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const slug = params.slug?.[0] || "home";
  const data: PageType = await getEntry(slug, "Pages");

  return (
    <main>
      {/* <pre>{JSON.stringify(data)}</pre> */}
      <Blocks blocks={data?.blocks} />
    </main>
  );
};

export default Page;
