import React from "react";

import {
  Sheet,
  SheetTrigger,
  SheetTitle,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetDescription,
} from "./Sheet";

const SideBar = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <button>Open Sheet 버튼</button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
          </SheetHeader>
          <SheetDescription>This is the Sheet description.</SheetDescription>
          <div>SideBar</div>
          <SheetFooter>
            <SheetClose asChild>
              <button>Close</button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SideBar;
