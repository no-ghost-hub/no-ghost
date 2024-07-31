import getEntry from "@/utils/getEntry";

import Blocks from "@/components/Blocks";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const slug = params.slug?.[0] || "home";
  const data = await getEntry(slug, "Pages");

  return (
    <main>
      {/* <pre>{JSON.stringify(data)}</pre> */}
      <Blocks blocks={data?.blocks} />
    </main>
  );
}
