import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div>
      Navbar
      <Link href="/sign-in">
        <Button>Login</Button>
      </Link>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Navbar;
