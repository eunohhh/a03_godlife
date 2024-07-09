import React from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "./Drawer";

import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetDescription,
} from "./Sheet";

const SideBar = () => {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <button>Open Drawer 버튼</button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription>This is the drawer description.</DrawerDescription>
          <div>SideBar</div>
          <DrawerFooter>
            <DrawerClose asChild>
              <button>Close</button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Sheet>
        y
        <SheetTrigger asChild>
          <button>Open Sheet 버튼</button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
          </SheetHeader>
          <SheetDescription>This is the drawer description.</SheetDescription>
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
