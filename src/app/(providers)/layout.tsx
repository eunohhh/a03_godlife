import { AuthProvider } from "@/context/auth.context";
import serverGetUser from "@/lib/severGetUser";
// import serverGetUser from "@/lib/severGetUser";
import React from "react";

async function ProvidersLayout({ children }: { children: React.ReactNode }) {
    const me = await serverGetUser();

    return <AuthProvider initialMe={me}>{children}</AuthProvider>;
}

export default ProvidersLayout;
