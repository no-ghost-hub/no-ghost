import Logo from "@/components/layout/Logo";
import Category from "@/components/menu/Category";
import getMenu from "@/utils/getMenu";
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

  let menu;

  if (group) {
    menu = await getMenu(group);
  }

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
