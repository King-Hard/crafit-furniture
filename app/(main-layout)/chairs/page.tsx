import Link from "next/link";

export default function Chairs(){
  return(
    <div>
      <div className="text-[13px] font-sans py-5">
        <Link href="/" className="text-muted-foreground hover:text-foreground">Home </Link> 
        <Link href="/furniture" className="text-muted-foreground hover:text-foreground">/ Furniture </Link> /
        <span> Chairs</span>
      </div>

      <h1 className="text-9xl">
        Chairs
      </h1>
    </div>
  );
}