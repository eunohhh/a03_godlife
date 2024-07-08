"use client";

import { Input } from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/Submit-button";
import { useAuth } from "@/context/auth.context";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { SiKakaotalk } from "react-icons/si";

export default function HomePage() {
    const { me, logIn, logOut, signUp } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isPending, setIsPending] = useState(false);

    const handleClickLogIn = async () => {
        setIsPending(true);
        logIn(email, password);
        setIsPending(false);
    };
    const handleClickLogOut = async () => logOut();
    const handleClickSignUp = async () => signUp(email, password);

    const handleKakao = async () => {
        const result = await signIn("kakao", {
            redirect: true,
            callbackUrl: "/",
        });
    };

    return (
        <section className="h-dvh w-[440px] flex flex-col items-center justify-center my-0 mx-auto">
            <div className="w-[400px] flex flex-col items-center justify-center gap-10">
                <div className="w-[110px] h-[110px] flex justify-center items-center rounded-full border border-turtleGreen">
                    <Image
                        src="/turtle.svg"
                        alt="logo"
                        width={100}
                        height={100}
                        priority
                        className="w-auto h-auto"
                    />
                </div>

                <div className="flex flex-col items-center justify-center gap-2 pb-8">
                    <h1 className="text-2xl font-bold">다시 만나 반갑습니다</h1>
                    <p className="text-sm text-gray-500">계속 사용하시려면 로그인을 해주세요</p>
                </div>

                <form className="w-full flex flex-col items-center justify-center gap-10">
                    <div className="w-[90%] flex flex-col items-center justify-center gap-10">
                        <Input
                            type="text"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="w-full flex flex-col gap-1">
                            <Input
                                type="text"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="w-full text-sm text-right text-gray-500">
                                비밀번호를 잊으셨나요?
                            </p>
                        </div>
                    </div>

                    <SubmitButton
                        className="bg-turtleGreen w-[70%] text-white rounded-lg px-4 py-2 text-foreground"
                        pendingText="로그인 중..."
                        pending={isPending}
                    >
                        로그인하기
                    </SubmitButton>
                </form>

                <hr className="w-2 border-gray-400" />

                <div className="flex items-center justify-center gap-2">
                    <FaGithub className="w-10 h-10" />
                    <FcGoogle className="w-11 h-11" />
                    <SiKakaotalk
                        className="w-10 h-10 text-amber-300 cursor-pointer"
                        onClick={handleKakao}
                    />
                </div>

                <p className="text-sm text-gray-500">
                    아직 회원이 아니신가요? <span className="text-turtleGreen">회원가입</span>
                </p>

                {/* <h1>현재 로그인한 유저는</h1>
            {me ? me.email + "입니다" : "없습니다"}

            <hr className="my-10 w-full border-black" /> */}

                {/* <hr className="my-10 w-full border-black" /> */}

                {/* <button className="button" onClick={handleClickLogOut}>
                로그아웃하기
            </button>

            <hr className="my-10 w-full border-black" />

            <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="button mt-3" onClick={handleClickSignUp}>
                회원가입하기
            </button> */}
            </div>
        </section>
    );
}
