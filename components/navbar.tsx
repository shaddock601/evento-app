import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-8 py-4 border-b">
      <div>
        <Image src="/logo.svg" width={50} height={50} alt="logo" />
      </div>
      <div>
        <Button size="icon">
          <Plus />
        </Button>
      </div>
      <div className="flex items-center space-x-3">
        <Link href="/sign-in">
          <Button variant="outline" size="sm">
            Login
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button size="sm">Register</Button>
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
