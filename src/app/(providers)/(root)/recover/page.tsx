import GithubLogInButton from "@/components/auth/GithubLogInButton";
import GoogleLogInButton from "@/components/auth/GoogleLogInButton";
import KaKaoLogInButton from "@/components/auth/KaKaoLogInButton";
import ResetForm from "@/components/auth/ResetForm";
import Image from "next/image";

export default function RecoverPage() {
    return (
        <section className="h-dvh w-[428px] flex flex-col items-center justify-center my-0 mx-auto">
            <div className="h-[860px] w-[400px] flex flex-col items-center justify-center gap-10">
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

                <ResetForm />

                <div className="w-full flex items-center justify-center gap-2">
                    <hr className="w-28 border-gray-400" />
                    <p className="text-sm text-gray-500">SNS 계정으로 로그인</p>
                    <hr className="w-28 border-gray-400" />
                </div>

                <div className="flex items-center justify-center gap-8">
                    <GithubLogInButton />
                    <GoogleLogInButton />
                    <KaKaoLogInButton />
                </div>

                <p className="text-sm text-gray-500">
                    Create account? <span className="text-turtleGreen">Sign up</span>
                </p>
            </div>
        </section>
    );
}
