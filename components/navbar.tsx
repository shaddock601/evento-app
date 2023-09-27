"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex items-center justify-between px-8 py-2 border-b">
      <Link href="/">
        <div>
          <Image src="/logo.svg" width={100} height={50} alt="logo" />
        </div>
      </Link>
      <div className="hidden md:inline-flex">
        <Button size="icon">
          <Plus />
        </Button>
      </div>
      <div className="items-center space-x-3 hidden md:inline-flex">
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
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="md:hidden">
        <Menu className="text-primary" />
      </div>
    </div>
  );
};

export default Navbar;
