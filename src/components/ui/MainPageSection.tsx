"use client";

import MainPost from "../MainPost";
import CenterLogo from "./CenterLogo";
import { DropdownMenuCheckboxes } from "./Checkbox";
import SidebarComponent from "./SidebarComponent";

function MainPageSection() {
    return (
        <>
            <div className="bg-turtleGreen max-w-[428px] p-2">
                <div className="flex flex-row justify-between px-2">
                    <SidebarComponent />

                    <CenterLogo />

                    <DropdownMenuCheckboxes />
                </div>
            </div>

            <MainPost />
        </>
    );
}

export default MainPageSection;
