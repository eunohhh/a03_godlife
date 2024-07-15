import { getUserFn } from "@/api/getUserFn";
import AuthPageBottom from "@/components/auth/AuthPageBottom";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";
import ResetForm from "@/components/auth/ResetForm";
import { Me } from "@/types/me.type";
import { QueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default async function RecoverPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: () => getUserFn(),
    });
    const me = queryClient.getQueryData<Me | undefined>(["user"]);

    // const me = await serverGetUser();

    // console.log("recover 에서 받은 user =>", me);

    return (
        <AuthPageWrapper>
            {!me ? (
                <p className="text-sm min-h-[35%]text-gray-500">
                    이메일 링크를 통한 접근만 가능합니다! 다시 시도해주세요
                </p>
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
