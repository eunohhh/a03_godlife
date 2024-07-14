import React from "react";

async function ProvidersLayout({ children }: { children: React.ReactNode }) {
    // const me = await serverGetUser();

    // const queryClient = new QueryClient();
    // await queryClient.prefetchQuery({
    //     queryKey: ["user"],
    //     queryFn: () => getUserFn(),
    // });
    // const dehydratedState = dehydrate(queryClient);

    // const me = await queryClient.getQueryData<Me | undefined>(["user"]);

    // console.log("me서버서버서버서버에서 ====>", me);

    return (
        <>{children}</>
        // <AuthProvider initialMe={me}>
        // <AuthProvider>
        // <Suspense fallback={<Loading />}>
        //<AuthHydrationBoundary>{ children }</AuthHydrationBoundary> */

        // </Suspense>
        // </AuthProvider>
    );
}

export default ProvidersLayout;
