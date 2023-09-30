"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import MobileNav from "@/components/mobile-nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useEventModal } from "@/hooks/use-event-modal";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const eventModal = useEventModal();
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const closeSheet = () => {
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-between px-8 py-2 border-b">
      <Link href="/">
        <div>
          <Image src="/logo.svg" width={100} height={50} alt="logo" />
        </div>
      </Link>
      <div className="hidden md:inline-flex">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="text-primary border-primary border-2 transition ease-in-out delay-150 hover:text-white hover:bg-primary hover:scale-110 duration-300"
              onClick={() => eventModal.onOpen()}
            >
              <Plus />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="text-primary text-sm font-bold w-auto">
            Add your event
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="items-center space-x-3 hidden md:inline-flex">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
        <div className={cn("space-x-3", isSignedIn ? "hidden" : "inline-flex")}>
          <Link href="/sign-in">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button size="sm">Register</Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <div className="flex items-center mr-3">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="hover:text-white hover:bg-primary transition ease-in-out delay-150 duration-300"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>

          <SheetTrigger>
            <Menu className="text-primary" />
          </SheetTrigger>
          <MobileNav closeSheet={closeSheet} />
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
