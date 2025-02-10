import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "@/styles/index.css";

import getGlobal from "@/utils/getGlobal";

import OrderBar from "@/components/layout/OrderBar";
import { GlobalProvider } from "@/components/providers/Global";
import useOdoo from "@/utils/useOdoo";

const leif = localFont({
  src: [
    {
      path: "../fonts/leif-800.woff2",
      style: "normal",
      weight: "800",
    },
  ],
  display: "swap",
  variable: "--font-leif",
});

export const metadata: Metadata = {
  title: "No Ghost",
};

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { strings } = await getGlobal("strings");

  return (
    <html lang="en" className={`${leif.variable} selection:bg-yellow`}>
      <body className="bg-grey">
        <GlobalProvider {...{ strings }} currency="EUR">
          {children}
          <div className="m-xs pointer-events-none fixed right-0 bottom-0 left-0 z-20 grid sm:place-content-center">
            <OrderBar />
          </div>
        </GlobalProvider>
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;
