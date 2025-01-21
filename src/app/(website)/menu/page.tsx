import Logo from "@/components/layout/Logo";
import Category from "@/components/menu/Category";
import parsed from "@/utils/parsed";
import useOdoo from "@/utils/useOdoo";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { slug } = await params;
  const { group } = await searchParams;

  // if (group) {
  const { data: menu } = await useOdoo({ route: `menu?group=menu` });
  // }

  return (
    <main>
      <header className="grid place-content-center">
        <div className="p-m">
          <Logo />
        </div>
      </header>
      {menu?.map((category: any) => {
        return (
          <div key={category.id} className="pb-l">
            <Category {...parsed(category, "category")} />
          </div>
        );
      })}
    </main>
  );
};

export default Page;
