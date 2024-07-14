"use client";

import { useAuth } from "@/hooks/useAuth";
import { showAlert } from "@/lib/openCustomAlert";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import SideBar from "./SideBar";

function SidebarComponent() {
    const { me } = useAuth();

    // console.log("sidebar me ====>", me);

    const router = useRouter();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSideBarClick = () => {
        // console.log("me=>", me);
        if (!me) {
            setIsOpen(false);
            showAlert("caution", "로그인 해주세요", () => router.push("/login"), true);
        } else {
            setIsOpen((prev) => !prev);
            // console.log("왜안돼");
        }
    };

    return (
        <SideBar isOpen={isOpen} handleOpen={setIsOpen}>
            <Avatar className="flexcursor-pointer">
                {me ? (
                    <AvatarImage
                        onClick={handleSideBarClick}
                        src={me.avatar as string}
                        alt="profile"
                        className="cursor-pointer"
                        sizes="100vw"
                    />
                ) : (
                    <Image
                        onClick={handleSideBarClick}
                        src="/turtle.png"
                        alt="turtle"
                        className="object-contain animate-pulse cursor-pointer"
                        width={100}
                        height={100}
                    />
                )}

                <AvatarFallback>
                    <div className="flex justify-center items-center">
                        <Image
                            src="/turtle.png"
                            alt="center_logo"
                            style={{ cursor: "pointer" }}
                            className="object-contain w-12 h-12"
                            width={100}
                            height={100}
                            priority
                        />
                    </div>
                    {/* <div className="h-10 w-10 relative rounded-full overflow-hidden">
                        <Image
                            onClick={handleSideBarClick}
                            src={
                                "https://ngtnbcqokvtyrilhkwpz.supabase.co/storage/v1/object/public/profile/Vector.png"
                            }
                            alt="profile"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-contain"
                        />
                    </div> */}
                </AvatarFallback>
            </Avatar>
        </SideBar>
    );
}

export default SidebarComponent;
