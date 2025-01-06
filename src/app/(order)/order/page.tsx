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
  const { data: menuGroups }: { data: any[] } = await useOdoo({
    route: "menu-groups",
  });

  const currentHour = new Date().getHours();
  const group = menuGroups.find(
    ({ hourFrom, hourTo }) =>
      currentHour >= parseInt(hourFrom) && currentHour < parseInt(hourTo),
  );

  let menu;

  if (group) {
    const { data } = await useOdoo({ route: `menu?group=${group.slug}` });
    menu = data;
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
            <Category
              {...parsed(category, "category")}
              theme={group?.slug || "default"}
            />
          </div>
        );
      })}
    </main>
  );
};

export default Page;
