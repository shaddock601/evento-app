"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton, useAuth } from "@clerk/nextjs";
import {
  CalendarHeart,
  HomeIcon,
  Plus,
} from "lucide-react";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const pathname = usePathname();
  const routes = [
    {
      label: "Home",
      href: `/`,
      icon: HomeIcon,
      active: pathname === `/`,
    },
    {
      label: "My Events",
      href: `/my-events`,
      icon: CalendarHeart,
      active: pathname === `/my-events`,
    },
  ];

  const { isSignedIn } = useAuth();
  const eventModal = useEventModal();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > prevScrollPos) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  if (!isMounted) {
    return null;
  }

  const closeSheet = () => {
    setOpen(false);
  };

  const handleCreateEvent = () => {
    if (isSignedIn) {
      eventModal.onOpen();
      eventModal.setModeAndEvent("create");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="flex items-center justify-between px-8 py-2">
      <div className="flex items-center">
        <Link href="/">
          <div>
            <Image src="/logo.svg" width={100} height={50} alt="logo" />
          </div>
        </Link>

        <NavigationMenu className="hidden sm:inline-flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-primary hover:text-primary"></NavigationMenuTrigger>
              <NavigationMenuContent className="px-4">
                <div className="py-4 space-y-1">
                  {routes.map((route: any) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "text-sm group flex p-3 justify-start font-bold cursor-pointer hover:text-primary rounded-lg transition duration-200 w-[200px]",
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
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="hidden sm:inline-flex items-center space-x-3 fixed right-1/2">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "text-primary border-primary border-2 rounded-full transition ease-in-out delay-150",
                isVisible
                  ? "opacity-100 transform translate-y-0 hover:text-white hover:bg-primary hover:scale-110 duration-300"
                  : "opacity-0 transform translate-y-full pointer-events-none duration-300"
              )}
              onClick={() => handleCreateEvent()}
            >
              <Plus />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="text-primary text-sm font-bold w-auto">
            Create your event
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="items-center space-x-3 hidden sm:inline-flex">
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
      <div className="flex items-center sm:hidden">
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
          <MobileNav closeSheet={closeSheet} routes={routes} />
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
