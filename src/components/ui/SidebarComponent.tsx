"use client";

import { useAuth } from "@/context/auth.context";
import { showAlert } from "@/lib/openCustomAlert";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import SideBar from "./SideBar";

function SidebarComponent() {
    const { me } = useAuth();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSideBarClick = () => {
        console.log("me=>", me);
        if (!me) {
            setIsOpen(false);
            showAlert("error", "로그인 해주세요", () => router.push("/login"), true);
        } else {
            setIsOpen((prev) => !prev);
            console.log("왜안돼");
        }
    };

    return (
        <SideBar isOpen={isOpen} handleOpen={setIsOpen}>
            <Avatar className="flex bg-white cursor-pointer">
                <AvatarImage
                    onClick={handleSideBarClick}
                    src={me?.userTableInfo.avatar as string}
                    alt="profile"
                />
                <AvatarFallback>
                    <div className="h-10 w-10 relative rounded-full overflow-hidden">
                        <Image
                            onClick={handleSideBarClick}
                            src={
                                "https://ngtnbcqokvtyrilhkwpz.supabase.co/storage/v1/object/public/profile/Vector.png"
                            }
                            alt="profile"
                            fill
                            className="object-contain"
                        />
                    </div>
                </AvatarFallback>
            </Avatar>
        </SideBar>
    );
}

export default SidebarComponent;
