import React from "react";

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-dvw overflow-hidden">
            <div className="my-0 mx-auto bg-turtleGreen max-w-[428px]">
                {/* <Suspense fallback={<Loading />}>{children}</Suspense> */}
                {children}
            </div>
        </main>
    );
}

export default RootLayout;
