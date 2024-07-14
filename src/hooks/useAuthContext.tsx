import { AuthContext } from "@/context/auth.context";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (context === undefined || context === null) {
        throw new Error("오류 발생! 오류발생! 훅은 프로바이더 안에서 써줘요잉");
    }

    return context;
};
