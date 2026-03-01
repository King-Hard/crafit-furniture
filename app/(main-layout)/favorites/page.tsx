import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Favorites(){
  return(
    <div>
      <h1 className="text-9xl">Your Wishlist is Empty</h1>
      <Link href="/furniture"><Button >Continue to Shopping</Button></Link>
    </div>
  );
}