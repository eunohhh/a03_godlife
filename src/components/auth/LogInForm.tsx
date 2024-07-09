"use client";
import { useAuth } from "@/context/auth.context";
import { emailRegex } from "@/lib/commonRegexs";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/Input";
import { SubmitButton } from "../ui/Submit-button";

function LogInForm() {
    const { isPending, logIn } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const search = searchParams.get("mode");
    const [isRecoverPassword, setIsRecoverPassword] = useState(search === "recover");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) return alert("빈 값이 없도록 해주세요");

        if (/\s/.test(email) || /\s/.test(password)) return alert("공백을 포함할 수 없습니다!");

        if (!emailRegex.test(email)) return alert("유효한 이메일 주소를 입력하세요!");
        if (password.length < 8 || password.length > 15) return alert("비밀번호는 4~15 글자로 해야합니다!");

        logIn(email, password);

        form.reset();
        router.replace("/");
    };

    const handleRecoverPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        form.reset();
        const formData = new FormData(form);
        const passwordOne = formData.get("passwordOne") as string;
        const passwordTwo = formData.get("passwordTwo") as string;

        if (!passwordOne || !passwordTwo) return alert("비밀번호를 입력해주세요!");
        if (passwordOne.length < 8 || passwordOne.length > 15)
            return alert("비밀번호는 4~15 글자로 해야합니다!");

        if (passwordOne !== passwordTwo) return alert("비밀번호가 일치하지 않습니다!");

        form.reset();
    };

    const handleForgetPassword = () => {
        setIsRecoverPassword(true);
        router.push("/login?mode=recover");
    };

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    useEffect(() => {
        if (!isRecoverPassword) router.push(pathname + "?" + createQueryString("mode", "login"));
    }, [pathname, createQueryString, router, isRecoverPassword]);

    // 이벤트
    useEffect(() => {
        if (!router) return;
        const handlePopState = () => {
            router.push("/login?mode=login");
            setIsRecoverPassword(false);
        };
        window.addEventListener("popstate", handlePopState);
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [router]);

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2 pb-8">
                <h1 className="text-2xl font-bold">{isRecoverPassword ? "비밀번호 복구" : "로그인"}</h1>
                <p className="text-sm text-gray-500">
                    {isRecoverPassword ? "Recover your password" : "Sign up to continue using our App"}
                </p>
            </div>

            <form
                onSubmit={isRecoverPassword ? handleRecoverPassword : handleSubmit}
                className="w-full flex flex-col items-center justify-center gap-10"
            >
                <div className="w-[90%] flex flex-col items-center justify-center gap-10">
                    {isRecoverPassword ? (
                        <Input type="password" placeholder="password" name="passwordOne" />
                    ) : (
                        <Input type="text" placeholder="email" name="email" />
                    )}
                    <div className="w-full flex flex-col gap-1">
                        <Input
                            type="password"
                            placeholder={isRecoverPassword ? "confirm password" : "password"}
                            name="passwordTwo"
                        />
                        {isRecoverPassword ? (
                            <p className="w-full text-sm text-right text-gray-500">비밀번호를 복구하세요</p>
                        ) : (
                            <Link
                                onClick={() => setIsRecoverPassword(true)}
                                href="/login?mode=recover"
                                className="w-full text-sm text-right text-gray-500"
                            >
                                Forget Password?
                            </Link>
                            // <p
                            //     onClick={handleForgetPassword}
                            //     className="w-full text-sm text-right text-gray-500 cursor-pointer"
                            // >
                            //     Forget Password?
                            // </p>
                        )}
                    </div>
                </div>

                <SubmitButton
                    className="bg-turtleGreen w-[70%] text-white rounded-lg px-4 py-2 text-foreground"
                    pendingText={isRecoverPassword ? "비밀번호 복구 중..." : "로그인 중..."}
                    pending={isPending}
                >
                    {isRecoverPassword ? "복구하기" : "로그인하기"}
                </SubmitButton>
            </form>
        </>
    );
}

export default LogInForm;
