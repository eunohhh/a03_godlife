"use client";
import { useAuth } from "@/context/auth.context";
import { emailRegex } from "@/lib/commonRegexs";
import { useRouter } from "next/navigation";
import { Input } from "../ui/Input";
import { SubmitButton } from "../ui/Submit-button";

function LogInForm() {
    const { isPending, logIn } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) return alert("빈 값이 없도록 해주세요");

        if (/\s/.test(email) || /\s/.test(password)) return alert("공백을 포함할 수 없습니다!");

        if (!emailRegex.test(email)) return alert("유효한 이메일 주소를 입력하세요!");
        if (password.length < 4 || password.length > 15) return alert("비밀번호는 4~15 글자로 해야합니다!");

        logIn(email, password);

        router.replace("/");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center gap-10">
            <div className="w-[90%] flex flex-col items-center justify-center gap-10">
                <Input type="text" placeholder="email" />
                <div className="w-full flex flex-col gap-1">
                    <Input type="password" placeholder="password" />
                    <p className="w-full text-sm text-right text-gray-500">Forget Password?</p>
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
    );
}

export default LogInForm;
