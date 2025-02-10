import Logo from "@/components/layout/Logo";
import Menu from "@/components/menu/Menu";
import Text from "@/components/elements/Text";

import SizeUtil from "@/components/utils/Size";

import { Suspense } from "react";

const MenuPage = ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <main className="pb-l">
      <header className="grid place-content-center">
        <div className="p-m">
          <Logo />
        </div>
      </header>
      <Suspense fallback={<MenuLoading />}>
        <Menu />
      </Suspense>
    </main>
  );
};

export default MenuPage;

export const MenuLoading = () => {
  return (
    <div className="mx-auto max-w-(--breakpoint-lg) px-[calc(var(--spacing-xs)/2)]">
      <SizeUtil name="menu-category" width scoped>
        <div className="gap-m grid">
          <Text tag="h3" align="center" transform="uppercase">
            <div className="bg-darkgrey w-(--w-item)">&nbsp;</div>
          </Text>
          <div className="gap-y-xs flex flex-wrap justify-center">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-(--w-item) px-[calc(var(--spacing-xs)/2)]"
              >
                <div className="grid shadow">
                  <div className="bg-darkgrey grid aspect-square" />
                  <div className="custom-underline animate-underline grid aspect-square bg-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SizeUtil>
    </div>
  );
};
