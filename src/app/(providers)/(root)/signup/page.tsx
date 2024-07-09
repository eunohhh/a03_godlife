import AuthPageBottom from "@/components/auth/AuthPageBottom";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";
import SignUpForm from "@/components/auth/SignUpForm";

export default async function SignUpPage() {
    return (
        <AuthPageWrapper>
            <SignUpForm />

            <AuthPageBottom />

            <p className="text-sm text-gray-500">
                Create account? <span className="text-turtleGreen">Sign up</span>
            </p>
        </AuthPageWrapper>
    );
}
