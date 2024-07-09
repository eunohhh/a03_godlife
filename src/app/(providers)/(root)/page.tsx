"use client";

import MainPost from "@/components/MainPost";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function MainPage() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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
          <Avatar className="flex">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
          <div className="flex">
            <Select>
              <SelectTrigger className="w-[75px]">
                <SelectValue placeholder="정렬" />
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
    </QueryClientProvider>
  );
}

export default MainPage;
