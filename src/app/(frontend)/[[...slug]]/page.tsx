import getEntry from "@/utils/getEntry";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const slug = params.slug?.[0] || "home";
  const data = await getEntry(slug, "Pages");

  console.log(data);

  return (
    <main>
      <pre>{JSON.stringify(data)}</pre>
    </main>
  );
}
