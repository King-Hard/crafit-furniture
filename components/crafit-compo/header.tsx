import { Handbag, Heart, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex-1 hidden lg:flex items-center">
            <Link href="/furniture" className="font-sans text-lg tracking-wider hover:opacity-70 transition-opacity">
              Furniture
            </Link>
          </div>

          <div className="flex-none lg:flex-1 flex lg:justify-center">
            <Link href="/" className="text-xl lg:text-2xl tracking-[0.2em] font-bold uppercase font-sans">
              Craftit
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-end gap-1">
            <Link href="/favorites"><Button variant="ghost" size="icon" className="h-9 w-9"><Heart className="h-5 w-5" /></Button></Link>
            <Link href="/authentication"><Button variant="ghost" size="icon" className="h-9 w-9"><UserRound className="h-5 w-5" /></Button></Link>
            <Link href="/carts"><Button variant="ghost" size="icon" className="h-9 w-9"><Handbag className="h-5 w-5" /></Button></Link>
            <div className="w-[1px] h-4 bg-border "/>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}