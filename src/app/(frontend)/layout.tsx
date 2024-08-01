import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/index.css";

const redHat = localFont({
  src: [
    {
      path: "./fonts/redhattext.woff2",
      style: "normal",
    },
    {
      path: "./fonts/redhattext-italic.woff2",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-redhat",
});

const dexlite = localFont({
  src: [
    {
      path: "./fonts/dexlite-700.woff2",
      style: "normal",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-dexlite",
});

export const metadata: Metadata = {
  title: "No Ghosts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${redHat.variable} ${dexlite.variable} selection:bg-purple selection:text-white`}
    >
      <body className="typo-p">{children}</body>
    </html>
  );
}
