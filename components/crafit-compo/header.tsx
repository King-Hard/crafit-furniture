import { Handbag, Heart, Search, UserRound} from "lucide-react";
import Link from "next/link";

export default function Header(){
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto px-4 md:px-8">
        <div className="flex items-center justify-around h-14">
          <div className="flex items-center gap-6 font-medium">
            <p>Shop</p>
            <p>New</p>
            <p>Collections</p>
          </div>
          <h1 className="text-2xl font-semibold tracking-widest font-sans">CRAFIT FURNITURE</h1>
          <div className="flex items-center gap-6">
            <Link href="/login">
              <Search size={20}/>
            </Link>
            <Link href="/login">
              <Heart size={20}/>
            </Link>
            <Link href="/login">
              <UserRound size={20}/>
            </Link>
            <Link href="/login">
              <Handbag size={20}/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}