"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserFnClient } from "@/api/getUserFnClient";

function useMeQuery() {
	return useQuery({
		queryKey: ["user"],
		queryFn: getUserFnClient,
	});
}

export default useMeQuery;
