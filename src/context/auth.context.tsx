"use client";

import { showAlert } from "@/lib/openCustomAlert";
import { Me } from "@/types/me.type";
import { Provider } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type AuthContextValue = {
    isLoggedIn: boolean;
    isPending: boolean;
    me: Me | null;
    logIn: (email: string, password: string) => void;
    logOut: () => void;
    signUp: (name: string, email: string, password: string) => void;
    loginWithProvider: (provider: Provider) => void;
    resetPassword: (password: string) => void;
    sendingResetEmail: (email: string) => void;
    setMeClient: (me: Me | null) => void;
};

const initialValue: AuthContextValue = {
    isLoggedIn: false,
    isPending: false,
    me: null,
    logIn: () => {},
    logOut: () => {},
    signUp: () => {},
    loginWithProvider: () => {},
    resetPassword: () => {},
    sendingResetEmail: () => {},
    setMeClient: () => {},
};

const AuthContext = createContext<AuthContextValue>(initialValue);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    initialMe: Me | null | string;
}

export function AuthProvider({ initialMe, children }: PropsWithChildren<AuthProviderProps>) {
    const initializeMe = initialMe === "Auth session missing!" ? null : (initialMe as Me);
    const [me, setMe] = useState<Me | null>(initializeMe);

    const isLoggedIn = !!me;
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const logIn: AuthContextValue["logIn"] = async (email, password) => {
        if (me) return showAlert("caution", "이미 로그인 되어 있어요");
        if (!email || !password) return showAlert("caution", "이메일, 비밀번호 모두 채워 주세요.");

        try {
            setIsPending(true);
            const data = { email, password };
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/log-in`, {
                method: "POST",
                body: JSON.stringify(data),
            });
            const { user, error } = await response.json();

            if (error) {
                setIsPending(false);
                if (error === "Invalid login credentials") {
                    return showAlert("caution", "이메일, 비밀번호를 확인해주세요.");
                }
                return showAlert("caution", error);
            }

            setMe(user);
            showAlert("success", "로그인 성공!", () => router.replace("/"));
            setIsPending(false);
        } catch (error) {
            console.error(error);
        }
    };

    const logOut = async () => {
        if (!me) return showAlert("caution", "로그인하고 눌러주세요");

        try {
            setIsPending(true);
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/log-out`, { method: "DELETE" });
        } catch (error) {
            console.error(error);
        }
        setMe(null);
        setIsPending(false);
        router.replace("/login");
    };

    const signUp: AuthContextValue["signUp"] = async (name, email, password) => {
        if (me) return showAlert("caution", "이미 로그인 되어 있어요");

        try {
            setIsPending(true);
            const payload = { name, email, password };
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-up`, {
                method: "POST",
                body: JSON.stringify(payload),
            });
            const data = await response.json();

            if (data.user) {
                setMe(data.user);
                setIsPending(false);
                showAlert("success", "회원가입 성공!", () => router.replace("/"));
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const loginWithProvider: AuthContextValue["loginWithProvider"] = async (provider) => {
        try {
            setIsPending(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/provider?provider=${provider}`
            );
            const data = await response.json();

            setIsPending(false);
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
            const data = await response.json();

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
                setMe(data.user);
                setIsPending(false);
                return showAlert("success", "비밀번호 변경 성공!", () => router.replace("/"));
            }
        } catch (error) {
            console.error(error);
            router.refresh();
            setIsPending(false);
        }
    };

    const setMeClient = (me: Me | null) => {
        setMe(me);
    };

    // 아래는 서버사이드에서 처리하기 때문에 주석처리
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`).then(async (response) => {
            if (response.status === 200) {
                const { data } = await response.json();
                setMe(data);
            }
        });
    }, []);

    // 여기는 나중에 지우기
    useEffect(() => {
        console.log("me 변경됨 ===>", me);
    }, [me]);

    const value: AuthContextValue = {
        isLoggedIn,
        isPending,
        me,
        logIn,
        logOut,
        signUp,
        loginWithProvider,
        resetPassword,
        sendingResetEmail,
        setMeClient,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
