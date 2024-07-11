"use client";

import MainPost from "@/components/MainPost";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/Select";
import SideBar from "@/components/ui/SideBar";

import { showAlert } from "@/lib/openCustomAlert";
import { useRouter } from "next/navigation";

function MainPage() {
    const router = useRouter();
    const handleSideBarClick = () => {
        showAlert("error", "로그인 해주세요", true);
        setTimeout(() => {
            router.push("./login");
        }, 0);
    };
    //이게 맞는지 모르겠는데 login된 상태라 확인이 되는지도 모르겠습니다ㅠㅠ

    const handleLogoClick = () => {
        window.location.reload();
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <div className="container w-full bg-turtleGreen max-w-[428px] p-2">
                <div className="navbar-center bg-#1d1d1d w-full h-[60px] text-center pt-[1rem] border-gray-500 border-b-2">
                    <div className="text-white">Main Header</div>
                </div>
                <div className="flex flex-row justify-between px-2 my-5">
                    <SideBar>
                        <Avatar className="flex">
                            <AvatarImage
                                onClick={handleSideBarClick}
                                src="https://ngtnbcqokvtyrilhkwpz.supabase.co/storage/v1/object/public/profile/Vector.png"
                                alt="profile"
                            />
                            <AvatarFallback>NA</AvatarFallback>
                        </Avatar>
                    </SideBar>
                    <div className="flex">
                        <img
                            src="/center_logo.svg"
                            onClick={handleLogoClick}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                    <div className="flex">
                        <Select>
                            <SelectTrigger className="w-[75px]">
                                <img src="/sort_btn.svg" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">인기순</SelectItem>
                                <SelectItem value="dark">최신순</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <MainPost />
                <div className="fixed bottom-[5%] right-[35%] group">
                    <img
                        className="cursor-pointer transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                        src="top_btn.svg"
                        alt="Top Button"
                        onClick={scrollToTop}
                    />
                </div>
            </div>
        </>
    );
}
export default MainPage;
