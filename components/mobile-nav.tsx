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
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  closeSheet: () => void;
  routes: any;
}

const MobileNav = ({ closeSheet, routes }: SidebarProps) => {
  const pathname = usePathname();
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
          className="w-full mt-4 mb-7"
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
        <Separator />
        <div className="py-4 space-y-1">
          {routes.map((route: any) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-bold cursor-pointer hover:text-primary rounded-lg transition duration-200",
                pathname === route.href
                  ? "text-primary bg-secondary"
                  : "text-zinc-700 dark:text-white"
              )}
              onClick={() => closeSheet()}
            >
              <route.icon className="h-5 w-5 mr-3" />
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </SheetContent>
  );
};

export default MobileNav;
