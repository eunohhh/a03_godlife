import MainHeader from "@/components/ui/MainHeader";
import React, { Suspense } from "react";
import Loading from "./loading";

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<Loading />}>
            <main className="w-dvw ">
                <div className="my-0 mx-auto bg-turtleGreen w-[428px]">
                    <MainHeader />
                    {children}
                </div>
            </main>
        </Suspense>
    );
}

export default RootLayout;
