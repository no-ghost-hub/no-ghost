import getEntry from "@/utils/getEntry";

import Blocks from "@/components/blocks";

const Promotion = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { slug } = await params;
  const data = await getEntry("promotions", slug);

  return (
    <main>
      {data?.blocks && data.blocks.length > 0 && (
        <Blocks blocks={data.blocks} />
      )}
    </main>
  );
};

export default Promotion;
