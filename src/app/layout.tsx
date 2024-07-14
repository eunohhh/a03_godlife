import QueryProvider from "@/providers/QueryProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://a03-godlife.vercel.app"),
  title: "God Life Mate",
  description: "God Life Mate",
  generator: "Next.js",
  applicationName: "God Life Mate",
  keywords: ["God Life", "god life", "Mate", "mate"],
  authors: [{ name: "A03-TripleS", url: "https://a03-godlife.vercel.app" }],
  creator: "A03-TripleS",
  publisher: "A03-TripleS",
  alternates: {
    canonical: "/",
    languages: {
      "ko-KR": "/",
    },
  },
  openGraph: {
    title: "God Life Mate",
    description: "God Life Mate",
    url: "https://a03-godlife.vercel.app",
    siteName: "God Life Mate",
    images: [
      {
        url: "/turtle.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  icons: {
    icon: "/favicon_icon.png",
    shortcut: "/favicon_icon.png",
    apple: "/favicon_icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/favicon_icon.png",
    },
  },
};

export default async function HTMLLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} overflow-x-hidden`}>
        <Suspense fallback={<Loading />}>
          <QueryProvider>{children}</QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
