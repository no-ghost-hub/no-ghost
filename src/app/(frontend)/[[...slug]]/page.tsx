import getEntry from "@/utils/getEntry";
import getGlobal from "@/utils/getGlobal";

import Blocks from "@/components/blocks";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { slug } = await params;
  const { home } = await getGlobal("Site");

  const data = await getEntry("Pages", slug || home.slug);

  return (
    <main>
      <Blocks blocks={data.blocks} />
    </main>
  );
};

export default Page;
