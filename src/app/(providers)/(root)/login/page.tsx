import AuthPageBottom from "@/components/auth/AuthPageBottom";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";
import LogInForm from "@/components/auth/LogInForm";
import Link from "next/link";

export default function LogInPage() {
  return (
    <AuthPageWrapper>
      <LogInForm />

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

/* <h1>현재 로그인한 유저는</h1>
{me ? me.email + "입니다" : "없습니다"}
*/
