import Image from "next/image";
import Link from "next/link";
import React from "react";

function AuthPageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center min-h-dvh bg-gray-50">
      <section className="h-dvh max-w-[428px] flex flex-col items-center justify-center my-0 mx-auto bg-white">
        <div className="h-[860px] w-[400px] flex flex-col items-center justify-center gap-10">
          <div className="w-[110px] h-[110px] flex justify-center items-center rounded-full border border-turtleGreen">
            <Link href="/">
              <Image
                src="/turtle.svg"
                alt="logo"
                width={100}
                height={100}
                priority
                className="w-auto h-auto"
              />
            </Link>
          </div>
          {children}
        </div>
      </section>
    </div>
  );
}

export default AuthPageWrapper;
