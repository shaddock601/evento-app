"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";

import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";
import { useEventModal } from "@/hooks/use-event-modal";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface SidebarProps {
  closeSheet: () => void;
}

const MobileNav = ({ closeSheet }: SidebarProps) => {
  const eventModal = useEventModal();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleCreateEvent = () => {
    if (isSignedIn) {
      eventModal.onOpen();
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <SheetContent className="flex flex-col h-full">
      <SheetHeader>
        <SheetTitle className="flex items-center justify-between w-full pt-8">
          <Link
            href="/"
            className="cursor-pointer"
            onClick={() => closeSheet()}
          >
            <Image src="/logo.svg" width={100} height={50} alt="logo" />
          </Link>
          <ModeToggle />
        </SheetTitle>
      </SheetHeader>
      <Separator />
      <div className="flex-grow">
        <Button
          className="w-full my-4"
          onClick={() => {
            handleCreateEvent();
            closeSheet();
          }}
        >
          <div className="flex items-center">
            Create Event
            <Plus className="ml-2" />
          </div>
        </Button>
      </div>
    </SheetContent>
  );
};

export default MobileNav;
