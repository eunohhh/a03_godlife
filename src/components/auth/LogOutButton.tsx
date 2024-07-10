"use client";

import { useAuth } from "@/context/auth.context";
import { showAlert } from "@/lib/openCustomAlert";

function LogOutButton() {
    const { logOut } = useAuth();
    const handleClick = async () => {
        logOut();
        showAlert("success", "로그아웃 성공!");
    };

    return <button onClick={handleClick}>LogOut</button>;
}

export default LogOutButton;
