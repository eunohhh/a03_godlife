import { getUserFn } from "@/api/getUserFn";
import { AuthProvider } from "@/context/auth.context";
import { Me } from "@/types/me.type";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Loading from "./loading";

async function ProvidersLayout({ children }: { children: React.ReactNode }) {
    // const me = await serverGetUser();

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: () => getUserFn(),
    });
    const dehydratedState = dehydrate(queryClient);

    const me = await queryClient.getQueryData<Me | undefined>(["user"]);

    // console.log("me서버서버서버서버에서 ====>", me);

    return (
        <Suspense fallback={<Loading />}>
            <HydrationBoundary state={dehydratedState}>
                <AuthProvider initialMe={me}>{children}</AuthProvider>
            </HydrationBoundary>
        </Suspense>
    );
}

export default ProvidersLayout;
