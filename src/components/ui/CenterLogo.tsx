"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CenterLogo() {
    const router = useRouter();

    const handleLogoClick = () => router.refresh();

    return (
        <div className="flex justify-center items-center">
            <div className="navbar-center bg-#1d1d1d w-full h-[60px] text-center pt-[1rem]">
                <Link href="/" className="text-white text-2xl font-MangoByeolbyeol">
                    God Life Mate
                </Link>
            </div>

            {/* <Image
                src="/turtle.png"
                alt="center_logo"
                onClick={handleLogoClick}
                style={{ cursor: "pointer" }}
                className="object-contain w-12 h-12"
                width={100}
                height={100}
                priority
            /> */}
        </div>
    );
}
