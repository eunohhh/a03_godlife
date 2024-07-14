import CenterLogo from "@/components/ui/CenterLogo";
import { DropdownMenuCheckboxes } from "@/components/ui/Checkbox";
import SidebarComponent from "@/components/ui/SidebarComponent";
import { Suspense } from "react";
import Loading from "./loading";

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-screen font-Pretendard-Regular">
            <div className="my-0 mx-auto bg-turtleGreen max-w-[428px]">
                <div className="bg-turtleGreen max-w-[428px] p-2">
                    <div className="flex flex-row justify-between px-2">
                        <SidebarComponent />

                        <CenterLogo />

                        <DropdownMenuCheckboxes />
                    </div>
                </div>
                <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
        </main>
    );
}

export default RootLayout;
