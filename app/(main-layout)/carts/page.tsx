import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Box, ChevronRight, Heart, LockKeyhole, MessageCircle, Minus, Plus, ShieldCheck, Tag, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const cartItems = [
  {
    id: 1,
    name: "Velvet Lounge Chair",
    price: 450,
    qty: 1,
    image: "/chair1.png",
    color: "Forest Green",
  },
  {
    id: 2,
    name: "Linear Sideboard",
    price: 450,
    qty: 1,
    image: "/cabinet1.png",
    color: "Forest Brown",
  },
  {
    id: 3,
    name: "Velvet Lounge Chair",
    price: 450,
    qty: 1,
    image: "/chair.jpg",
    color: "Forest Green",
  },
  {
    id: 4,
    name: "Velvet Lounge Chair",
    price: 450,
    qty: 1,
    image: "/chair.jpg",
    color: "Forest Green",
  },
];

export default function CartWithItems() {
  return (
    <div className="mx-auto px-6 lg:px-12 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12 text-center px-4">
        <h1 className="font-serif text-foreground text-5xl lg:text-7xl tracking-tight">Basket</h1>
        <div className="h-[1px] w-12 bg-foreground/20 mx-auto mt-6" />
      </header>

      <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
        {/* --- LEFT SIDE: Product List --- */}
        <div className="lg:col-span-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex border-b border-border py-8 first:border-t"
            >
              {/* Image Container - Updated to use Next.js Image */}
              <div className="relative h-40 w-32 flex-shrink-0 overflow-hidden bg-[#f7f7f7] dark:bg-[#1a1a1a] sm:h-52 sm:w-40">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="ml-6 flex flex-1 flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-widest text-foreground">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.color}
                    </p>
                  </div>

                  <p className="text-sm font-medium text-foreground">
                    ₱{item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-input rounded-sm">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-none hover:bg-accent"
                    >
                      <Minus size={12} />
                    </Button>
                    <span className="px-4 text-xs font-medium tabular-nums">
                      {item.qty}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-none hover:bg-accent"
                    >
                      <Plus size={12} />
                    </Button>
                  </div>        
                  
                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="hover:text-foreground">
                      <Heart size={18} strokeWidth={2} />
                    </Button>
                    <Button variant="outline" size="icon" className="hover:text-destructive">
                      <X size={18} strokeWidth={2} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- RIGHT SIDE: Summary --- */}
        <div className="lg:col-span-4">
          <Card className="sticky top-24 p-8">
            <h2 className="uppercase tracking-[0.2em] text-sm lg:text-base">
              Order Summary
            </h2>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-muted-foreground font-medium">
                  <span>Subtotal</span> 
                  <span className="text-foreground">₱1,800.00</span>
                </div>

                <div className="flex items-center justify-between text-muted-foreground text-sm pb-1">
                  <span>Delivery Charges</span>
                  <span className="text-sm">Calculated at Checkout</span>
                </div>
              </div>
              
              <div className="border-t border-border pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₱872.00</span>
                </div>
              </div>
            </div>

            <Link href="/checkout-furniture">
              <Button variant="outline" className="w-full h-12 text-xs uppercase tracking-widest font-bold mt-4">
                Proceed to Checkout
              </Button>
            </Link>

            <div>
              <div className="flex items-center justify-between border-b py-4">
                <div className="flex gap-2 items-center">
                  <LockKeyhole size={18}/>
                  <h1 className="text-sm">Secure Payment</h1>
                </div>
              </div>

              <div className="flex items-center justify-between border-b py-4">
                <div className="flex gap-2 items-center">
                  <ShieldCheck size={18}/>
                  <h1 className="text-sm">Warranty</h1>
                </div>
                <div className="text-muted-foreground text-sm">
                  <span>2 years</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-b py-4">
                <div className="flex gap-2 items-center">
                  <MessageCircle size={18}/>
                  <h1 className="text-sm">Customer Service</h1>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-sm">Easy to contact us</span>
                  <ChevronRight size={18} />
                </div>
              </div>

              <div className="flex items-center justify-between py-4">
                <div className="flex gap-2 items-center">
                  <Box size={18}/>
                  <h1 className="text-sm">Easy Return</h1>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span>15 days to change your mind</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}