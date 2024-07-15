import React from "react";

async function ProvidersLayout({ children }: { children: React.ReactNode }) {
    // const me = await serverGetUser();

    // const queryClient = new QueryClient();
    // await queryClient.prefetchQuery({
    //     queryKey: ["user"],
    //     queryFn: () => getUserFn(),
    // });
    // const dehydratedState = dehydrate(queryClient);

    // const me = queryClient.getQueryData<Me | undefined>(["user"]);

    // console.log("me서버서버서버서버에서 ====>", me);

    return (
        <>{children}</>
        // <Suspense fallback={<Loading />}>
        //     <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
        // </Suspense>
        // <AuthProvider initialMe={me}>
        // <AuthProvider>
        // <Suspense fallback={<Loading />}>
        //<AuthHydrationBoundary>{ children }</AuthHydrationBoundary> */

        // </Suspense>
        // </AuthProvider>
        //
    );
}

export default ProvidersLayout;
