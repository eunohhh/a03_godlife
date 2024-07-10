"use client";

import { useAuth } from "@/context/auth.context";
import { usePathname } from "next/navigation";
import { SiKakaotalk } from "react-icons/si";

function KaKaoLogInButton() {
    const { loginWithProvider } = useAuth();
    const pathname = usePathname();

    const handleClickKaKao = async () => {
        if (pathname === "/recover") return alert("비밀번호 복구 페이지에서는 소셜로그인이 불가합니다");
        loginWithProvider("kakao");
    };

    return <SiKakaotalk className="w-10 h-10 text-amber-300 cursor-pointer" onClick={handleClickKaKao} />;
}

export default KaKaoLogInButton;
