import { AuthProvider } from "@/context/auth.context";
import serverGetUser from "@/lib/severGetUser";
import React, { Suspense } from "react";
import Loading from "./loading";

async function ProvidersLayout({ children }: { children: React.ReactNode }) {
    const me = await serverGetUser();

    return (
        <Suspense fallback={<Loading />}>
            <AuthProvider initialMe={me}>{children}</AuthProvider>
        </Suspense>
    );
}

export default ProvidersLayout;
