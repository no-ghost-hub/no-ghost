import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "@/styles/index.css";

import getGlobal from "@/utils/getGlobal";

import OrderBar from "@/components/layout/OrderBar";
import Wrapper from "@/components/utils/Wrapper";

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
        {children}
        <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-20 m-xs grid sm:place-content-center">
          <Wrapper context={{ strings }}>
            <OrderBar />
          </Wrapper>
        </div>
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;
