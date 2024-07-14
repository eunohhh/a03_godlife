import { AuthContextValue } from "@/context/auth.context";
import useMeQuery from "@/hooks/useMeQuery";
import { Users } from "@/types/me.type";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { showAlert } from "../lib/openCustomAlert";

export default function useAuth() {
    const { data: me, isPending: userIsPending, error: userError } = useMeQuery();
    const isLoggedIn = !!me;

    const [isPending, setIsPending] = useState(userIsPending);
    const router = useRouter();
    const queryClient = useQueryClient();

    // console.log("isPending ====>", userIsPending);

    const logIn: AuthContextValue["logIn"] = async (email: string, password: string) => {
        if (me?.userTableInfo) return showAlert("caution", "이미 로그인 되어 있어요");
        if (!email || !password) return showAlert("caution", "이메일, 비밀번호 모두 채워 주세요.");

        try {
            setIsPending(true);
            const data = { email, password };
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/log-in`, {
                method: "POST",
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("fetch 실패");
            }
            const { error } = await response.json();

            if (error) {
                setIsPending(false);
                if (error === "Invalid login credentials") {
                    return showAlert("caution", "이메일, 비밀번호를 확인해주세요.");
                }
                return showAlert("caution", error);
            }

            queryClient.invalidateQueries({ queryKey: ["user"] });
            // setMe(user);
            showAlert("success", "로그인 성공!", () => router.replace("/"));
            // setIsPending(userIsPending);
        } catch (error) {
            console.error(error);
        }
    };

    const logOut = async () => {
        if (!me?.userTableInfo) return showAlert("caution", "로그인하고 눌러주세요");

        try {
            setIsPending(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/log-out`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("fetch 실패");
            }
        } catch (error) {
            console.error(error);
        }
        // setMe(null);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        setIsPending(userIsPending);
        router.replace("/login");
    };

    const signUp: AuthContextValue["signUp"] = async (name: string, email: string, password: string) => {
        if (me?.userTableInfo) return showAlert("caution", "이미 로그인 되어 있어요");

        try {
            setIsPending(true);
            const payload = { name, email, password };
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-up`, {
                method: "POST",
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error("fetch 실패");
            }
            const data = await response.json();

            if (data.user) {
                // setMe(data.user);
                queryClient.invalidateQueries({ queryKey: ["user"] });
                // setIsPending(userIsPending);
                showAlert("success", "회원가입 성공!", () => router.replace("/"));
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const loginWithProvider: AuthContextValue["loginWithProvider"] = async (provider: string) => {
        try {
            setIsPending(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/provider?provider=${provider}`
            );
            if (!response.ok) {
                throw new Error("fetch 실패");
            }
            const data = await response.json();

            queryClient.invalidateQueries({ queryKey: ["user"] });
            // setIsPending(userIsPending);
            router.replace(data.url);
            showAlert("success", "로그인 성공");
        } catch (error) {
            console.error(error);
        }
    };

    const sendingResetEmail = async (email: string) => {
        try {
            setIsPending(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/recover-redirect`, {
                method: "POST",
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error("fetch 실패");
            }
            setIsPending(false);
            return showAlert("success", "이메일 전송 성공!", () => router.replace("/login"));
        } catch (error) {
            console.error(error);
            setIsPending(false);
        }
    };

    const resetPassword = async (password: string) => {
        try {
            setIsPending(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/recover`, {
                method: "POST",
                body: JSON.stringify({ password }),
            });
            const data = await response.json();
            if (data.error === "New password should be different from the old password.") {
                setIsPending(false);
                return showAlert("caution", "기존 비밀번호와 동일합니다!");
            } else {
                // setMe(data.user);
                queryClient.invalidateQueries({ queryKey: ["user"] });
                // setIsPending(userIsPending);
                return showAlert("success", "비밀번호 변경 성공!", () => router.replace("/"));
            }
        } catch (error) {
            console.error(error);
            router.refresh();
            setIsPending(false);
        }
    };

    useEffect(() => {
        setIsPending(userIsPending);
    }, [userIsPending]);

    return {
        isLoggedIn,
        isPending,
        me: userError ? null : (me?.userTableInfo as Users | null),
        logIn,
        logOut,
        signUp,
        loginWithProvider,
        resetPassword,
        sendingResetEmail,
    };
}
