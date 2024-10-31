import getEntry from "@/utils/getEntry";
import getGlobal from "@/utils/getGlobal";

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
      {/* <pre>{JSON.stringify(data)}</pre> */}
      {/* <Blocks blocks={data?.blocks} /> */}
    </main>
  );
};

export default Page;
