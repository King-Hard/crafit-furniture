import { Button } from "@/components/ui/button";
import { Handbag } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-5xl px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <div className="flex-1 hidden lg:flex items-center">

            </div>

            <div className="flex-none lg:flex-1 flex lg:justify-center">
              <Link href="/" className="text-xl lg:text-2xl tracking-[0.2em] font-bold uppercase font-sans">
                Craftit
              </Link>
            </div>

            <div className="flex-1 flex items-center justify-end">
              <Link href="/carts">
                <Button variant="default" size="icon" className="h-9 w-9">
                  <Handbag className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}