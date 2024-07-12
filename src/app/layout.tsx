// import { authOptions } from "@/auth";
import type { Metadata } from "next";
// import { getServerSession } from "next-auth/next";
import QueryProvider from "@/providers/QueryProvider";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Loading from "./loading";

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
                <Suspense fallback={<Loading />}>
                    <QueryProvider>{children}</QueryProvider>
                </Suspense>
            </body>
        </html>
    );
}
