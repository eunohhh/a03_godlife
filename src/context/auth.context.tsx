"use client";

import { User } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type AuthContextValue = {
    isLoggedIn: boolean;
    me: User | null;
    logIn: (email: string, password: string) => void;
    logOut: () => void;
    signUp: (email: string, password: string) => void;
};

const initialValue: AuthContextValue = {
    isLoggedIn: false,
    me: null,
    logIn: () => {},
    logOut: () => {},
    signUp: () => {},
};

const AuthContext = createContext<AuthContextValue>(initialValue);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    initialMe: User | null;
}

export function AuthProvider({ initialMe, children }: PropsWithChildren<AuthProviderProps>) {
    const [me, setMe] = useState<AuthContextValue["me"]>(initialMe);
    const isLoggedIn = !!me;

    const logIn: AuthContextValue["logIn"] = async (email, password) => {
        if (me) return alert("이미 로그인 되어 있어요");
        if (!email || !password) return alert("이메일, 비밀번호 모두 채워 주세요.");

        const data = { email, password };
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/log-in`, {
            method: "POST",
            body: JSON.stringify(data),
        });
        const user = await response.json();

        setMe(user);
    };

    const logOut = async () => {
        if (!me) return alert("로그인하고 눌러주세요");

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/log-out`, { method: "DELETE" });

        setMe(null);
    };

    const signUp: AuthContextValue["signUp"] = async (email, password) => {
        if (me) return alert("이미 로그인 되어 있어요");
        if (!email || !password) return alert("이메일, 비밀번호 모두 채워 주세요.");

        const data = { email, password };
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-up`, {
            method: "POST",
            body: JSON.stringify(data),
        });
        const user = await response.json();

        setMe(user);
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
        me,
        logIn,
        logOut,
        signUp,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
