"use client";
import useAuth from "@/hooks/useAuth";
import GithubLogInButton from "./GithubLogInButton";
import GoogleLogInButton from "./GoogleLogInButton";
import KaKaoLogInButton from "./KaKaoLogInButton";

function AuthPageBottom() {
    // 추후에 제거할 것
    const { logOut } = useAuth();
    const handleClick = async () => logOut();

    return (
        <>
            <div className="w-full flex items-center justify-center gap-2">
                <hr className="w-28 border-gray-400" />
                <p className="text-sm text-gray-500" onClick={handleClick}>
                    SNS 계정으로 로그인
                </p>
                <hr className="w-28 border-gray-400" />
            </div>

            <div className="flex items-center justify-center gap-8">
                <GithubLogInButton />
                <GoogleLogInButton />
                <KaKaoLogInButton />
            </div>
        </>
    );
}

export default AuthPageBottom;
