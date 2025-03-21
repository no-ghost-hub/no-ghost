import Logo from "@/components/layout/Logo";
import Menu, { MenuLoading } from "@/components/menu/Menu";
import OrderBar from "@/components/layout/OrderBar";

import { Suspense } from "react";
import { NavigationLoading } from "@/components/layout/Navigation";
import getTableOrder from "@/odoo/getTableOrder";

const OrderPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { table } = await searchParams;

  let order;
  if (table && typeof table === "string") {
    const { data } = await getTableOrder(table);
    order = data;
  }

  return (
    <main className="pb-l">
      <header className="grid place-content-center">
        <div className="p-m">
          <Logo />
        </div>
      </header>
      <Suspense fallback={<MenuLoading />}>
        <Menu theme="order" />
      </Suspense>
      <div className="m-xs pointer-events-none fixed right-0 bottom-0 left-0 z-20 grid sm:place-content-center">
        <Suspense fallback={<NavigationLoading />}>
          <OrderBar already={order} />
        </Suspense>
      </div>
    </main>
  );
};

export default OrderPage;
