import QueryProvider from "@/providers/QueryProvider";
import type { Metadata } from "next";
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
        <html lang="ko">
            <body className={`${inter.className} overflow-x-hidden`}>
                {/* <Suspense fallback={<Loading />}> */}
                <QueryProvider>{children}</QueryProvider>
                {/* </Suspense> */}
            </body>
        </html>
    );
}
