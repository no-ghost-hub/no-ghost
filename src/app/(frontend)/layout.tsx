import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/index.css";

import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const leif = localFont({
  src: [
    {
      path: "./fonts/leif-800.woff2",
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
        {children}
        <div className="fixed inset-x-0 bottom-0 m-xs grid place-content-center">
          <Navigation />
        </div>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
