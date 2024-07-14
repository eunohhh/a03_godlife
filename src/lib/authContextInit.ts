"use client";

import { Users } from "@/types/me.type";
import { Provider } from "@supabase/supabase-js";
import { createContext } from "react";

export type AuthContextValue = {
    isLoggedIn: boolean;
    isPending: boolean;
    me: Users | null;
    logIn: (email: string, password: string) => void;
    logOut: () => void;
    signUp: (name: string, email: string, password: string) => void;
    loginWithProvider: (provider: Provider) => void;
    resetPassword: (password: string) => void;
    sendingResetEmail: (email: string) => void;
    // setMeClient: (me: Me | null) => void;
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
    // setMeClient: () => {},
};

export const AuthContext = createContext<AuthContextValue>(initialValue);
