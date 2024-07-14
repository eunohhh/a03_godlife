import Image from "next/image";
import Link from "next/link";
import React from "react";

function AuthPageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center items-center min-h-dvh bg-gray-50">
            <section className="h-dvh w-full flex flex-col items-center justify-center my-0 mx-auto bg-white">
                <div className="h-full w-full flex flex-col items-center justify-center gap-10">
                    <div className="w-[110px] h-[110px] flex justify-center items-center rounded-full border border-turtleGreen">
                        <Image
                            src="/turtle.png"
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
        </div>
    );
}

export default AuthPageWrapper;
