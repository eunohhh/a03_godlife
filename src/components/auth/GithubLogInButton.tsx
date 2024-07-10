"use client";

import { useAuth } from "@/context/auth.context";
import { showAlert } from "@/lib/openCustomAlert";
import { usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa";

function GithubLogInButton() {
    const { loginWithProvider } = useAuth();
    const pathname = usePathname();

    const handleClickGithub = async () => {
        if (pathname === "/recover")
            return showAlert("error", "비밀번호 복구 페이지에서는 소셜로그인이 불가합니다");
        loginWithProvider("github");
    };

    return <FaGithub className="w-10 h-10 cursor-pointer" onClick={handleClickGithub} />;
}

export default GithubLogInButton;
