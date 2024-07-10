"use client";

import { showAlert } from "@/lib/openCustomAlert";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TestPage() {
    const router = useRouter();

    useEffect(() => {
        showAlert("error", "로그인 해주세요", () => router.push("/login"), true);
    }, []);

    return <div>test</div>;
}
