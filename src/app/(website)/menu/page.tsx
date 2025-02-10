import Logo from "@/components/layout/Logo";
import Menu, { MenuLoading } from "@/components/menu/Menu";

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
