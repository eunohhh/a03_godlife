export interface PostStoreState {
    sortBy: "latest" | "popular";
    setSortBy: (newSortBy: "latest" | "popular") => void;
}
