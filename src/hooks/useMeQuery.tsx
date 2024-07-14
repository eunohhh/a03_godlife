import { getUserFnClient } from "@/api/getUserFnClient";
import { useQuery } from "@tanstack/react-query";

function useMeQuery() {
    return useQuery({
        queryKey: ["user"],
        queryFn: getUserFnClient,
    });
}

export default useMeQuery;
