"use client";

import { useAuth } from "@/context/auth.context";
import { FaGithub } from "react-icons/fa";

function GithubLogInButton() {
    const { loginWithProvider } = useAuth();
    const handleClickGithub = async () => loginWithProvider("github");

    return <FaGithub className="w-10 h-10 cursor-pointer" onClick={handleClickGithub} />;
}

export default GithubLogInButton;
