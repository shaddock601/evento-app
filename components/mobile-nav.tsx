"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";

import { SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";

interface SidebarProps {
    closeSheet: () => void;
}

const MobileNav = ({ closeSheet }: SidebarProps) => {
    return (
        <SheetContent className="flex flex-col h-full">
            <SheetHeader>
                <SheetTitle className="flex items-center justify-between w-full py-8">
                    <Link href="/" className="cursor-pointer" onClick={() => closeSheet()}>
                        <Image src="/logo.svg" width={100} height={50} alt="logo" />
                    </Link>
                    <ModeToggle />
                </SheetTitle>
            </SheetHeader>
            <div className="flex-grow">
                <Button className="w-full my-4">
                    <div className="flex items-center">
                        Add Event
                        <Plus className="ml-2" />
                    </div>
                </Button>
            </div>
            <SheetFooter className="mt-auto">
                <div className="grid gap-x-2 grid-cols-2">
                    <Button variant="outline">Login</Button>
                    <Button>Register</Button>
                </div>
            </SheetFooter>
        </SheetContent>
    );
}

export default MobileNav;