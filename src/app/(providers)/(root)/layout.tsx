import React, { Suspense } from "react";
import Loading from "./loading";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <main className="w-screen font-Pretendard-Regular">
        <div className="my-0 mx-auto bg-turtleGreen max-w-[428px]">
          {children}
        </div>
      </main>
    </Suspense>
  );
}

export default RootLayout;
