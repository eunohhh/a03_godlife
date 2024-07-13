"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CenterLogo() {
    const router = useRouter();

    const handleLogoClick = () => router.refresh();

    return (
        <div className="flex justify-center items-center">
            <Image
                src="/turtle.png"
                alt="center_logo"
                onClick={handleLogoClick}
                style={{ cursor: "pointer" }}
                className="object-contain w-12 h-12"
                width={100}
                height={100}
            />
        </div>
    );
}
