import AuthPageBottom from "@/components/auth/AuthPageBottom";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";
import SignUpForm from "@/components/auth/SignUpForm";
import Link from "next/link";

export default async function SignUpPage() {
    return (
        <AuthPageWrapper>
            <SignUpForm />

            <AuthPageBottom />

            <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-turtleGreen">
                    Log In
                </Link>
            </p>
        </AuthPageWrapper>
    );
}
