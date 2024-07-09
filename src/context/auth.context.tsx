"use client";

import { Provider, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type AuthContextValue = {
    isLoggedIn: boolean;
    isPending: boolean;
    me: User | null;
    logIn: (email: string, password: string) => void;
    logOut: () => void;
    signUp: (email: string, password: string) => void;
    loginWithProvider: (provider: Provider) => void;
    resetPassword: (password: string) => Promise<boolean>;
    sendingResetEmail: (email: string) => void;
};

const initialValue: AuthContextValue = {
    isLoggedIn: false,
    isPending: false,
    me: null,
    logIn: () => {},
    logOut: () => {},
    signUp: () => {},
    loginWithProvider: () => {},
    resetPassword: () => Promise.resolve(false),
    sendingResetEmail: () => {},
};

const AuthContext = createContext<AuthContextValue>(initialValue);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    initialMe: User | null | string;
}

export function AuthProvider({ initialMe, children }: PropsWithChildren<AuthProviderProps>) {
    const initializeMe = initialMe === "Auth session missing!" ? null : (initialMe as User);
    const [me, setMe] = useState<AuthContextValue["me"]>(initializeMe);

    const isLoggedIn = !!me;
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const logIn: AuthContextValue["logIn"] = async (email, password) => {
        if (me) return alert("이미 로그인 되어 있어요");
        if (!email || !password) return alert("이메일, 비밀번호 모두 채워 주세요.");

        try {
            setIsPending(true);
            const data = { email, password };
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/log-in`, {
                method: "POST",
                body: JSON.stringify(data),
            });
            const user = await response.json();

            setMe(user);
            setIsPending(false);
        } catch (error) {
            console.error(error);
        }
    };

    const logOut = async () => {
        if (!me) return alert("로그인하고 눌러주세요");

        try {
            setIsPending(true);
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/log-out`, { method: "DELETE" });
            setIsPending(false);
        } catch (error) {
            console.error(error);
        }

        setMe(null);
    };

    const signUp: AuthContextValue["signUp"] = async (email, password) => {
        if (me) return alert("이미 로그인 되어 있어요");
        if (!email || !password) return alert("이메일, 비밀번호 모두 채워 주세요.");

        try {
            setIsPending(true);
            const data = { email, password };
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-up`, {
                method: "POST",
                body: JSON.stringify(data),
            });
            const user = await response.json();

            setMe(user);
            setIsPending(false);
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
            console.log(data);
        } catch (error) {
            console.error(error);
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
            setIsPending(false);
            if (data.error === "New password should be different from the old password.") {
                alert("기존 비밀번호와 동일합니다!");
                return false;
            } else {
                setMe(data.user);
                return true;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    // 아래는 서버사이드에서 처리하기 때문에 주석처리
    // useEffect(() => {
    //     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`).then(async (response) => {
    //         if (response.status === 200) {
    //             const {
    //                 data: { user },
    //             } = await response.json();
    //             setMe(user);
    //         }
    //     });
    // }, []);

    // 여기는 나중에 지우기
    useEffect(() => {
        console.log(me);
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
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
