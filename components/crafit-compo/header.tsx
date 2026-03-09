"use client";

import { Handbag, Heart, UserRound, Menu, X } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/furniture", label: "Furniture" },
  { href: "/customize", label: "Customize" },
];

const iconLinks = [
  { href: "/favorites", label: "Wishlist", icon: Heart },
  { href: "/authentication", label: "Profile", icon: UserRound },
  { href: "/carts", label: "Cart", icon: Handbag },
];

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">

          <div className="flex-1 flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-base tracking-wider hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0 [&>button]:hidden">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col h-full">
                    <div className="flex items-center px-6 py-5 border-b justify-between">
                      <span className="text-lg tracking-[0.2em] font-bold uppercase font-sans">Craftit</span>
                      <SheetClose asChild>
                        <Button variant="outline" size="icon-sm">
                          <X />
                        </Button>
                      </SheetClose>
                    </div>

                    <div className="flex flex-col px-4 py-6 gap-1">
                      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground px-3 mb-2">Navigation</p>
                      {navLinks.map((link) => (
                        <SheetClose asChild key={link.href}>
                          <Link
                            href={link.href}
                            className="px-3 py-3 text-sm uppercase tracking-[0.2em] font-medium hover:bg-accent rounded-lg transition-colors"
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>

                    {/* Account Links */}
                    <div className="flex flex-col px-4 gap-1 border-t pt-6">
                      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground px-3 mb-2">Account</p>
                      {iconLinks.map(({ href, label, icon: Icon }) => (
                        <SheetClose asChild key={href}>
                          <Link
                            href={href}
                            className="flex items-center gap-3 px-3 py-3 text-sm uppercase tracking-[0.2em] font-medium hover:bg-accent rounded-lg transition-colors"
                          >
                            <Icon size={16} className="text-muted-foreground" />
                            {label}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>

                    
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* CENTER — Logo */}
          <div className="flex-none lg:flex-1 flex lg:justify-center">
            <Link href="/" className="text-xl lg:text-2xl tracking-[0.2em] font-bold uppercase font-sans">
              Craftit
            </Link>
          </div>

          {/* RIGHT — Desktop icons */}
          <div className="flex-1 flex items-center justify-end gap-1">
            <div className="hidden lg:flex items-center gap-1">
              {iconLinks.map(({ href, icon: Icon }) => (
                <Link key={href} href={href}>
                  <Button variant="ghost" size="icon">
                    <Icon/>
                  </Button>
                </Link>
              ))}
              <div className="w-[1px] h-4 bg-border mx-1" />
            </div>
            <ModeToggle />
          </div>

        </div>
      </div>
    </nav>
  );
}