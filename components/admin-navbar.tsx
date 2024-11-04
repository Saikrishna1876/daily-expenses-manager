import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import NavLink from "./nav-link";
import { ToggleButton } from "./ui/toggle-button";
import { Button } from "./ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

function Links() {
  return (
    <>
      <NavLink href="/admin/product-types">Product Types</NavLink>
      <NavLink href="/admin/products">Products</NavLink>
      <NavLink href="/admin/orders">Orders</NavLink>
      <NavLink href="/">Return</NavLink>
      <NavLink href="#">
        <ToggleButton />
      </NavLink>
    </>
  );
}

function AdminNavbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between py-4 px-7 border-b">
      <Link className="font-semibold text-xl" href="/">
        Daily Balance
      </Link>
      <Sheet>
        <SheetTrigger className="md:hidden" asChild>
          <Button variant="outline" className="rounded-full" size="icon">
            <DotsHorizontalIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="md:hidden">
          <SheetHeader>
            <SheetTitle>Navigation links</SheetTitle>
            <SheetDescription>The navigation links</SheetDescription>
          </SheetHeader>
          <ul className="my-4">
            <Links />
          </ul>
        </SheetContent>
      </Sheet>
      <ul className="hidden md:flex items-center">
        <Links />
      </ul>
    </div>
  );
}

export default AdminNavbar;
