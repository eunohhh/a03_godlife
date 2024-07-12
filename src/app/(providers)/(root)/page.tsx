import MainPost from "@/components/MainPost";
import CenterLogo from "@/components/ui/CenterLogo";
import { DropdownMenuCheckboxes } from "@/components/ui/Checkbox";
import SidebarComponent from "@/components/ui/SidebarComponent";
import TopButton from "@/components/ui/TopButton";

function MainPage() {
    return (
        <>
            <div className="bg-turtleGreen w-[428px]">
                <div className="flex flex-row justify-between px-2 my-5">
                    <SidebarComponent />

                    <CenterLogo />

                    <DropdownMenuCheckboxes />
                </div>
            </div>

            <MainPost />

            <TopButton />
        </>
    );
}

export default MainPage;
