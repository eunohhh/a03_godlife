"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CenterLogo() {
    const router = useRouter();

    const handleLogoClick = () => router.refresh();

    return (
        <div className="flex justify-center items-center">
            <Image
                src="/center_logo.svg"
                alt="center_logo"
                onClick={handleLogoClick}
                style={{ cursor: "pointer" }}
                className="object-contain w-auto h-auto"
                width={60}
                height={60}
            />
        </div>
    );
}
