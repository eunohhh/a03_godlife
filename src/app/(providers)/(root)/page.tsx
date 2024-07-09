"use client";
import { useAuth } from "@/context/auth.context";

function MainPage() {
    const { logOut } = useAuth();

    const handleClick = async () => logOut();

    return (
        <div>
            이곳에 사이드바가 위치합니다. <button onClick={handleClick}>로그아웃</button>
        </div>
    );
}

export default MainPage;
