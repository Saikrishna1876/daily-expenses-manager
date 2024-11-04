"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: boolean;
  className?: string;
}

function NavLink({ href, children, className, icon = false }: NavLinkProps) {
  const pathname = usePathname();
  return (
    <li>
      <Link
        className="text-muted-foreground hover:text-accent-foreground"
        href={href}
      >
        <Button
          variant="link"
          className={cn(
            className,
            pathname === href ? "font-bold underline" : ""
          )}
          size={icon ? "icon" : "default"}
        >
          {children}
        </Button>
      </Link>
    </li>
  );
}

export default NavLink;
