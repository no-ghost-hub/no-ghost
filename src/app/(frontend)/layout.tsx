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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${leif.variable} selection:bg-purple selection:text-white`}
    >
      <body className="typo-p">
        {children}
        <Navigation />
        <Footer />
      </body>
    </html>
  );
}
