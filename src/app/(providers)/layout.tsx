import { AuthProvider } from "@/context/auth.context";
import serverGetUser from "@/lib/severGetUser";
// import serverGetUser from "@/lib/severGetUser";
import React from "react";

async function ProvidersLayout({ children }: { children: React.ReactNode }) {
    const me = await serverGetUser();

    // console.log("providers 에서 받은 user =>", me);

    return <AuthProvider initialMe={me}>{children}</AuthProvider>;
}

export default ProvidersLayout;
