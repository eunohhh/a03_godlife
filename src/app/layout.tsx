// import { authOptions } from "@/auth";
import type { Metadata } from "next";
// import { getServerSession } from "next-auth/next";
import QueryProvider from "@/providers/QueryProvider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "God Life Mate",
  description: "God Life Mate",
};

export default async function HTMLLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
