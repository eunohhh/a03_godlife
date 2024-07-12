import { Tables } from "./supabase";

export type Post = Tables<"posts">;

export type User = Tables<"users">;

export interface PostStoreState {
    sortBy: "latest" | "popular";
    setSortBy: (newSortBy: "latest" | "popular") => void;
}
