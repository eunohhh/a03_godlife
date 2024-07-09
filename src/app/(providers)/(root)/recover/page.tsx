import AuthPageBottom from "@/components/auth/AuthPageBottom";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";
import ResetForm from "@/components/auth/ResetForm";
import serverGetUser from "@/lib/severGetUser";
import Link from "next/link";

export default async function RecoverPage() {
    const me = await serverGetUser();

    // console.log("recover 에서 받은 user =>", me);

    return (
        <AuthPageWrapper>
            {!me ? (
                <p className="text-sm min-h-[35%]text-gray-500">오류 발생! 다시 시도해주세요</p>
            ) : (
                <ResetForm />
            )}

            <AuthPageBottom />

            <p className="text-sm text-gray-500">
                Create account?{" "}
                <Link href="/signup" className="text-turtleGreen">
                    Sign up
                </Link>
            </p>
        </AuthPageWrapper>
    );
}
