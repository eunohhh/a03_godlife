import React, { Suspense } from "react";
import Loading from "./loading";

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-dvw overflow-hidden">
            <div className="my-0 mx-auto bg-turtleGreen max-w-[428px]">
                <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
        </main>
    );
}

export default RootLayout;
