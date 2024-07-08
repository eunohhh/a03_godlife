import NextAuth, { type DefaultSession } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            address: string;
            /**
             * By default, TypeScript merges new interface properties and overwrites existing ones.
             * In this case, the default session user properties will be overwritten,
             * with the new ones defined above. To keep the default session user properties,
             * you need to add them back into the newly declared interface.
             */
        } & DefaultSession["user"];
    }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
    // session: {
    //     strategy: "jwt",
    // },
    // jwt: {
    //     secret: process.env.NEXTAUTH_SECRET,
    // },
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID!,
            clientSecret: process.env.KAKAO_CLIENT_SECRET!,
        }),
    ],
    // callbacks: {
    //     async jwt({ token, user }) {
    //         return { ...token, ...user };
    //     },
    //     async session({ session, token }) {
    //         session.user = token;
    //         return session;
    //     },
    // },
    // pages: {
    //     signIn: "/login",
    // },
});
