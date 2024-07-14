"use client";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import * as React from "react";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { usePostStore } from "@/zustand/post.store";

type Checked = DropdownMenuCheckboxItemProps["checked"];

// interface DropdownMenuCheckboxesProps {
//     onSortChange: (sortBy: "latest" | "popular") => void;
// }

export function DropdownMenuCheckboxes() {
    const { setSortBy } = usePostStore((state) => ({
        setSortBy: state.setSortBy,
    }));

    const [sortByLatest, setSortByLatest] = React.useState<Checked>(true);
    const [sortByPopular, setSortByPopular] = React.useState<Checked>(false);

    const handleSortChange = (sortBy: "latest" | "popular") => {
        if (sortBy === "latest") {
            setSortByLatest(true);
            setSortByPopular(false);
        } else {
            setSortByLatest(false);
            setSortByPopular(true);
        }
        setSortBy(sortBy);
    };

    return (
        <div className="flex">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <img className="cursor-pointer w-7" src="/sort_btn.svg" alt="Sort" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                        checked={sortByLatest}
                        onCheckedChange={() => handleSortChange("latest")}
                    >
                        Latest Post
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={sortByPopular}
                        onCheckedChange={() => handleSortChange("popular")}
                    >
                        Popular Post
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
