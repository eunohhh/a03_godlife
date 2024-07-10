"use client";
import { Input } from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/Submit-button";
import { useAuth } from "@/context/auth.context";
import { validateWhiteSpace } from "@/lib/authValidations";
import { emailRegex } from "@/lib/commonRegexs";
import { useRouter } from "next/navigation";

function SignUpForm() {
    const { isPending, signUp } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const passwordOne = formData.get("password") as string;
        const passwordTwo = formData.get("passwordConfirm") as string;

        if (!name || !email || !passwordOne || !passwordTwo) return alert("빈 값이 없도록 해주세요");

        if (validateWhiteSpace([name, email, passwordOne, passwordTwo]))
            return alert("공백을 포함할 수 없습니다!");

        if (!emailRegex.test(email)) return alert("유효한 이메일 주소를 입력하세요!");

        if (!passwordOne || !passwordTwo) return alert("비밀번호를 입력해주세요!");

        if (passwordOne.length < 8 || passwordOne.length > 15)
            return alert("비밀번호는 8~15 글자로 해야합니다!");

        if (passwordOne !== passwordTwo) return alert("비밀번호가 일치하지 않습니다!");

        form.reset();

        signUp(name, email, passwordOne);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2 pb-6">
                <h1 className="text-2xl font-bold">회원가입</h1>
                <p className="text-sm text-gray-500">Please enter the details below to continue</p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="w-full h-fit min-h-[35%] flex flex-col items-center justify-center gap-10"
            >
                <div className="w-[90%] flex flex-col items-center justify-center gap-10">
                    <div className="w-full flex flex-col gap-4">
                        <Input type="text" placeholder="your email" name="email" />
                        <Input type="text" placeholder="your nickname" name="name" />
                        <Input type="password" placeholder="password" name="password" />
                        <Input type="password" placeholder="repeat password" name="passwordConfirm" />
                    </div>
                </div>

                <SubmitButton
                    className="bg-turtleGreen w-[70%] text-white rounded-lg px-4 py-2 text-foreground"
                    pendingText="회원가입중..."
                    pending={isPending}
                >
                    회원가입
                </SubmitButton>
            </form>
        </>
    );
}

export default SignUpForm;
