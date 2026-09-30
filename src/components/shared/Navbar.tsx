"use client";

import { LayoutDashboard, LogOut, Menu, PlusCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn, getInitials } from "@/lib/utils";
import { Logo } from "../ui/logo";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/about" },
  { label: "Live Tracking", href: "/tracking" },
  { label: "Contact", href: "/contact" },
];

export type NavbarUser = {
  name: string;
  email: string;
  image?: string | null;
};

type NavbarProps = {
  user?: NavbarUser | null;
  onLogout?: () => void;
};

export function Navbar({
  user = null,
  onLogout,
}: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop links */}
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "text-base font-medium transition-colors hover:text-blue-600",
                isActive(link.href) ? "text-blue-600" : "text-slate-700",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <Button
                asChild
                className="hidden bg-blue-600 hover:bg-blue-700 sm:inline-flex"
              >
                <Link href="/requests/new">
                  <PlusCircle className="size-4" />
                  Submit Request
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger
                  className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  aria-label="Open profile menu"
                >
                  <Avatar className="size-9">
                    <AvatarImage
                      src={user.image ?? undefined}
                      alt={user.name}
                    />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="size-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="size-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={onLogout}>
                    <LogOut className="size-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                className="hidden text-slate-700 sm:inline-flex"
              >
                <Link href="/login">Log in</Link>
              </Button>
              <Button
                asChild
                className="hidden bg-blue-600 hover:bg-blue-700 sm:inline-flex"
              >
                <Link href="/requests/new">
                  <PlusCircle className="size-4" />
                  Submit Request
                </Link>
              </Button>
            </>
          )}

          {/* Mobile burger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] max-w-sm">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>

              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cn(
                        "rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-accent",
                        isActive(link.href)
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-700",
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-2 p-4">
                {!user && (
                  <SheetClose asChild>
                    <Button asChild variant="outline">
                      <Link href="/login">Log in</Link>
                    </Button>
                  </SheetClose>
                )}
                <SheetClose asChild>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/requests/new">
                      <PlusCircle className="size-4" />
                      Submit Request
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
