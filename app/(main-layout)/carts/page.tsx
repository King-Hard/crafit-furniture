import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Carts(){
  return(
    <div>
      <h1 className="text-9xl">Your Basket is Empty</h1>
      <Link href="/furniture"><Button >Continue to Shopping</Button></Link>
    </div>
  );
}