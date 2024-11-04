import Link from "next/link";
import NavLink from "./nav-link";
import { PlusIcon } from "@radix-ui/react-icons";
import { ToggleButton } from "./ui/toggle-button";

function Navbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between py-4 px-7 border-b">
      <Link className="font-semibold text-xl" href="/">
        Daily Balance
      </Link>
      <ul className="flex items-center gap-x-4">
        <NavLink
          className="border rounded-full transition-all hover:scale-110 hover:text-foreground"
          icon
          href="/new"
        >
          <PlusIcon />
        </NavLink>
        <ToggleButton />
      </ul>
    </div>
  );
}

export default Navbar;
