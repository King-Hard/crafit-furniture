import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Furniture(){
  return (
    <div className="mx-auto px-4 md:px-8">
      <div className="text-[13px] font-sans py-5">
        <Link href="/" className="text-muted-foreground hover:text-foreground">Home </Link> 
        <Link href="/furniture" className="">/ Furniture </Link>
      </div>

      <h1 className="font-['Times_New_Roman',_serif] text-center tracking-wider text-5xl lg:text-7xl">
        Furniture
      </h1>

      <div className="flex items-center justify-center gap-3 py-8">
        <Button className="text-sm lg:text-base">See all</Button>
        <Button variant="outline" className="text-sm lg:text-base">Tables</Button>
        <Button variant="outline" className="text-sm lg:text-base">Chairs</Button>
        <Button variant="outline" className="text-sm lg:text-base">Cabinets</Button>
      </div>
    </div>
  );
}