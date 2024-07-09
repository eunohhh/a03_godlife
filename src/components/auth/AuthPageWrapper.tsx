import Image from "next/image";
import React from "react";

function AuthPageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <section className="h-dvh w-[428px] flex flex-col items-center justify-center my-0 mx-auto">
            <div className="h-[860px] w-[400px] flex flex-col items-center justify-center gap-10">
                <div className="w-[110px] h-[110px] flex justify-center items-center rounded-full border border-turtleGreen">
                    <Image
                        src="/turtle.svg"
                        alt="logo"
                        width={100}
                        height={100}
                        priority
                        className="w-auto h-auto"
                    />
                </div>
                {children}
            </div>
        </section>
    );
}

export default AuthPageWrapper;
