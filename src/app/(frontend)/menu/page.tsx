import Category from "@/components/menu/Category";
import parsed from "@/utils/parsed";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { slug } = await params;
  const { group } = await searchParams;

  const menuResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/foodics/menu?group=${group}`,
  );

  const menu = await menuResponse.json();
  console.log(menu);

  return (
    <main>
      {menu?.map((category: any) => {
        return <Category key={category.id} {...parsed(category, "category")} />;
      })}
    </main>
  );
};

export default Page;
