import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "@/styles/index.css";

import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { GlobalProvider } from "@/components/providers/Global";

import getGlobal from "@/utils/getGlobal";

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
        <GlobalProvider {...{ strings }}>
          {children}
          <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-20 m-xs grid sm:place-content-center">
            <Navigation />
          </div>
          {/* <Footer /> */}
        </GlobalProvider>
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;
