import { PostStoreState } from "@/types/post.type";
import { create } from "zustand";

export const usePostStore = create<PostStoreState>((set) => ({
    sortBy: "latest",
    setSortBy: (newSortBy) => set({ sortBy: newSortBy }),
}));

// import { useShallow } from "zustand/react/shallow";

// const { sortBy, setSortBy } = usePostStore(
//     useShallow((state) => ({
//         sortBy: state.sortBy,
//         setSortBy: state.setSortBy,
//     }))
// );
