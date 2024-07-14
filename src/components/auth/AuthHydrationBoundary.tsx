import { getUserFn } from "@/api/getUserFn";
// import { AuthProvider } from "@/context/auth.context";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import React from "react";

async function AuthHydrationBoundary({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: () => getUserFn(),
    });
    const dehydratedState = dehydrate(queryClient);

    // const me = await queryClient.getQueryData<Me | undefined>(["user"]);

    return (
        <HydrationBoundary state={dehydratedState}>
            {/* <AuthProvider initialMe={me}>{children}</AuthProvider> */}
            {/* <AuthProvider>{children}</AuthProvider> */}
            {children}
        </HydrationBoundary>
    );
}

export default AuthHydrationBoundary;
