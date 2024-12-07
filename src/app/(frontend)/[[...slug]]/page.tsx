import getEntry from "@/utils/getEntry";
import getGlobal from "@/utils/getGlobal";

import Blocks from "@/components/blocks";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { slug } = await params;

  const { home } = await getGlobal("site");

  const data = await getEntry("pages", slug?.[0] || home.slug);

  return (
    <main>
      {data?.blocks && data.blocks.length > 0 && (
        <Blocks blocks={data.blocks} />
      )}
    </main>
  );
};

export default Page;
