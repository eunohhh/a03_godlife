import React, { Suspense } from "react";
import Loading from "./loading";

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    return <Suspense fallback={<Loading />}>{children}</Suspense>;
}

export default AuthenticatedLayout;
