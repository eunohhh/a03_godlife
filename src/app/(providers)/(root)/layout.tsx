import React from "react";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <main className="w-dvw font-Pretendard-Regular">
        <div className="my-0 mx-auto bg-turtleGreen max-w-[428px]">
          {children}
        </div>
      </main>
    </Suspense>
  );
}

export default RootLayout;
