import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Furniture(){
  return (
    <div className="">
      <div className="text-[13px] font-sans py-5">
        <Link href="/" className="text-muted-foreground hover:text-foreground">Home </Link> 
        <Link href="/furniture">/ Furniture </Link>
      </div>

      <h1 className="font-['Times_New_Roman',_serif] text-center tracking-wider text-5xl lg:text-7xl">
        Furniture
      </h1>

      <div className="flex items-center justify-center py-8 gap-2 lg:gap-3">
        <Button className="text-sm lg:text-base">See all</Button>
        <Link href="/chairs">
          <Button variant="outline" className="text-sm lg:text-base">Chairs</Button>
        </Link>

        <Link href="/tables">
          <Button variant="outline" className="text-sm lg:text-base">Tables</Button>
        </Link>

        <Link href="/cabinets">
          <Button variant="outline" className="text-sm lg:text-base">Cabinets</Button>
        </Link>

        <Link href="/beds&frames">
          <Button variant="outline" className="text-sm lg:text-base">Bed & Frames</Button>
        </Link>
      </div>
    </div>
  );
}