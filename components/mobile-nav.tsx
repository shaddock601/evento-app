"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";

import { SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
    closeSheet: () => void;
}

const MobileNav = ({ closeSheet }: SidebarProps) => {
    const { isSignedIn } = useAuth();
    return (
        <SheetContent className="flex flex-col h-full">
            <SheetHeader>
                <SheetTitle className="flex items-center justify-between w-full py-8">
                    <Link href="/" className="cursor-pointer" onClick={() => closeSheet()}>
                        <Image src="/logo.svg" width={100} height={50} alt="logo" />
                    </Link>
                    <div className="flex items-center space-x-2">
                        <ModeToggle />
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </SheetTitle>
            </SheetHeader>
            <div className="flex-grow">
                <Button className="w-full my-4" onClick={() => closeSheet()}>
                    <div className="flex items-center">
                        Add Event
                        <Plus className="ml-2" />
                    </div>
                </Button>
            </div>
            <SheetFooter className="mt-auto">
                <div className={cn("grid grid-cols-2 gap-2 w-full", isSignedIn ? "hidden" : "flex")}>
                    <Link href="/sign-in">
                        <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link href="/sign-up">
                        <Button className="w-full">Register</Button>
                    </Link>
                </div>
            </SheetFooter>
        </SheetContent>

    );
}

export default MobileNav;