"use client";

import { useRouter } from "next/navigation";

export default function CenterLogo() {
    const router = useRouter();

    const handleLogoClick = () => router.refresh();

    return (
        <div className="flex w-full justify-center items-center">
            <img src="/center_logo.svg" onClick={handleLogoClick} style={{ cursor: "pointer" }} />
        </div>
    );
}
