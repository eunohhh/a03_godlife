"use client";

import { useAuth } from "@/context/auth.context";
import { FcGoogle } from "react-icons/fc";

function GoogleLogInButton() {
    const { loginWithProvider } = useAuth();
    const handleClickGoogle = async () => loginWithProvider("google");

    return <FcGoogle className="w-11 h-11 cursor-pointer" onClick={handleClickGoogle} />;
}

export default GoogleLogInButton;
