import SideBar from "@/components/ui/SideBar";

import MainPost from "@/components/MainPost";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import RefreshLogo from "@/components/RefreshLogo";

function MainPage() {
  return (
    <>
      <div>
      <p>사이드바 영역입니당</p>
      <SideBar />
    </div>
    
    <div className="container w-full bg-turtleGreen max-w-[428px] p-2">
      <div className="navbar-center bg-#1d1d1d w-full h-[60px] text-center pt-[1rem] border-gray-500 border-b-2">
        <div className="text-white">Main Header</div>
      </div>
      <div className="flex flex-row justify-between px-2 my-5">
        <Avatar className="flex">
          <AvatarImage
            src="https://ngtnbcqokvtyrilhkwpz.supabase.co/storage/v1/object/public/profile/Vector.png"
            alt="@shadcn"
          />
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>
        <div className="flex">
          <RefreshLogo />
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
      <MainPost></MainPost>
    </div>
    </>
  );
}

export default MainPage;
