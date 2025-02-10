import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "@/styles/index.css";

import Main from "@/components/layout/Main";
import Loader from "@/components/utils/Loader";
import { Suspense } from "react";

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
  return (
    <html lang="en" className={`${leif.variable} selection:bg-yellow`}>
      <body className="bg-grey">
        <Suspense fallback={<Loading />}>
          <Main>{children}</Main>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
};

const Loading = () => {
  return (
    <main className="grid h-screen place-content-center">
      <Loader />
    </main>
  );
};

export default Layout;
