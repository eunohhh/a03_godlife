"use client";

import { useAuth } from "@/context/auth.context";
import { SiKakaotalk } from "react-icons/si";

function KaKaoLogInButton() {
    const { loginWithProvider } = useAuth();

    const handleClickKaKao = async () => loginWithProvider("kakao");

    return <SiKakaotalk className="w-10 h-10 text-amber-300 cursor-pointer" onClick={handleClickKaKao} />;
}

export default KaKaoLogInButton;
