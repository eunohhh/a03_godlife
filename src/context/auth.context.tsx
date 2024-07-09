"use client";

import { Provider, User } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type AuthContextValue = {
    isLoggedIn: boolean;
    isPending: boolean;
    me: User | null;
    logIn: (email: string, password: string) => void;
    logOut: () => void;
    signUp: (email: string, password: string) => void;
    loginWithProvider: (provider: Provider) => void;
};

const initialValue: AuthContextValue = {
    isLoggedIn: false,
    isPending: false,
    me: null,
    logIn: () => {},
    logOut: () => {},
    signUp: () => {},
    loginWithProvider: () => {},
};

const AuthContext = createContext<AuthContextValue>(initialValue);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    initialMe: User | null;
}

export function AuthProvider({ initialMe, children }: PropsWithChildren<AuthProviderProps>) {
    const [me, setMe] = useState<AuthContextValue["me"]>(initialMe);
    const isLoggedIn = !!me;
    const [isPending, setIsPending] = useState(false);

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
            const user = await response.json();

            setMe(user);
            setIsPending(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`).then(async (response) => {
            if (response.status === 200) {
                const {
                    data: { user },
                } = await response.json();
                setMe(user);
            }
        });
    }, []);

    const value: AuthContextValue = {
        isLoggedIn,
        isPending,
        me,
        logIn,
        logOut,
        signUp,
        loginWithProvider,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
