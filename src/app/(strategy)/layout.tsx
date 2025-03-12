import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/index.css";
import { Suspense } from "react";
import { redirect } from "next/navigation";

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
  if (process.env.NODE_ENV !== "development") {
    redirect("/");
  }

  return (
    <html lang="en" className={`${leif.variable} selection:bg-yellow`}>
      <body className="bg-grey">
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
};

export default Layout;
