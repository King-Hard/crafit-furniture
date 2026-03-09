"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import Link from "next/link";

const initialFavorites = [
  { id: 1, name: "Velvet Lounge Chair", price: 4500, image: "/chair.jpg", color: "Forest Green", inStock: true },
  { id: 2, name: "Mahogany Dining Table", price: 18500, image: "/table.jpg", color: "Natural Wood", inStock: true },
  { id: 3, name: "L-Shape Sofa", price: 24000, image: "/sofa.jpg", color: "Charcoal Gray", inStock: false },
  { id: 4, name: "Queen Bed Frame", price: 12000, image: "/bed.jpg", color: "Walnut Brown", inStock: true },
];

export default function Favorites() {
  const [favorites, setFavorites] = useState(initialFavorites);

  const removeItem = (id: number) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  return (
    <div className="mx-auto px-6 lg:px-12 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12 text-center px-4">
        <h1 className="font-serif text-foreground text-5xl lg:text-7xl tracking-tight">Wishlist</h1>
        <div className="h-[1px] w-12 bg-foreground/20 mx-auto mt-6" />
      </header>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Heart size={40} className="text-muted-foreground/40" strokeWidth={1.5} />
          <p className="text-muted-foreground text-sm">Your wishlist is empty.</p>
          <Link href="/furniture">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((item) => (
              <div key={item.id} className="group flex flex-col">
                <div className="relative bg-accent/70 aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-background/80 px-3 py-1.5">Out of Stock</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="text-xs font-medium uppercase tracking-widest">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{item.color}</p>
                  </div>
                  
                  <div className="mt-auto">
                    <p className="text-sm font-medium mb-3">₱{item.price.toLocaleString()}</p>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant={item.inStock ? "default" : "outline"}
                        disabled={!item.inStock}
                        className="flex-1 h-10 text-xs uppercase tracking-widest font-bold"
                      >
                        {item.inStock ? "Add to Cart" : "Notify Me"}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="h-10 w-10 shrink-0 text-muted-foreground hover:text-destructive hover:border-destructive transition-colors group/trash"
                      >
                        <Trash2 size={16} className="group-hover/trash:scale-110 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/furniture">
              <Button variant="outline" className="h-12 px-8 text-xs uppercase tracking-widest font-bold">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}