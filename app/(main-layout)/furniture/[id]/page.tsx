"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Minus, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const product = {
  id: 1,
  name: "Minimalist Lounge Chair",
  price: 12500,
  description:
    "Crafted with precision and care, this lounge chair blends modern minimalism with the warmth of natural materials. Perfect for living rooms, reading nooks, or any space that deserves a touch of quiet elegance.",
  materials: "Solid Narra Wood, Premium Foam, Woven Fabric Upholstery",
  dimensions: {
    width: '28"',
    depth: '30"',
    height: '34"',
    seatHeight: '17"',
  },
  colors: [
    { id: 1, name: "Forest Green", hex: "#4a6741" },
    { id: 2, name: "Warm Beige", hex: "#c9b99a" },
    { id: 3, name: "Charcoal", hex: "#3d3d3d" },
    { id: 4, name: "Ivory White", hex: "#f0ece4" },
  ],
  images: [
    "/chair1.jpg",
    "/chair2.jpg",
    "/chair3.jpg",
    "/chair4.jpg",
  ],
  category: "Chairs",
};

const relatedProducts = [
  { id: 2, name: "Artisan Stool", price: 8200, img: "/chair2.jpg", category: "Chairs" },
  { id: 3, name: "Solid Oak Dining", price: 35000, img: "/t1.jpg", category: "Tables" },
  { id: 4, name: "Narra Wardrobe", price: 85000, img: "/cab1.jpg", category: "Cabinets" },
  { id: 5, name: "Siesta Platform", price: 45000, img: "/bed1.jpg", category: "Beds" },
];

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("description");

  return (
    <main className="min-h-screen pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Breadcrumb */}
      <nav className="mx-auto px-6 lg:px-12 py-6">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <Link href="/furniture" className="hover:text-foreground transition-colors">Furniture</Link>
          <span className="opacity-50">/</span>
          <Link href="/chairs" className="hover:text-foreground transition-colors">{product.category}</Link>
          <span className="opacity-50">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto px-6 lg:px-12 max-w-[1800px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">

          {/* LEFT — Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2 w-16 shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square w-full overflow-hidden bg-accent/70 transition-all ${
                    selectedImage === i ? "ring-1 ring-foreground" : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1 aspect-[3/4] overflow-hidden bg-accent/70">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/10 font-serif italic text-6xl z-0">
                Craftit
              </div>
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover z-10 transition-opacity duration-300"
              />
            </div>
          </div>

          {/* RIGHT — Product Details */}
          <div className="flex flex-col gap-6 lg:pt-4">
            {/* Title & Price */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-2">{product.category}</p>
              <h1 className="font-serif text-4xl lg:text-5xl tracking-tight text-foreground">{product.name}</h1>
              <p className="text-2xl font-medium mt-4">₱{product.price.toLocaleString()}</p>
            </div>

            {/* Color Variants */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Color — <span className="text-foreground">{selectedColor.name}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={`w-8 h-8 rounded-full transition-all ${
                      selectedColor.id === color.id
                        ? "ring-2 ring-offset-2 ring-foreground"
                        : "hover:scale-110"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Qty + Actions */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-input rounded-sm">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 rounded-none hover:bg-accent"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <Minus size={12} />
                </Button>
                <span className="px-5 text-sm font-medium tabular-nums">{qty}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 rounded-none hover:bg-accent"
                  onClick={() => setQty((q) => q + 1)}
                >
                  <Plus size={12} />
                </Button>
              </div>

              <Button variant="outline" className="flex-1 h-11 text-xs uppercase tracking-widest font-bold">
                Add to Cart
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={`h-11 w-11 shrink-0 transition-colors ${wishlisted ? "text-red-500 border-red-200 hover:text-red-600" : ""}`}
                onClick={() => setWishlisted(!wishlisted)}
              >
                <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
              </Button>
            </div>

            <section className="space-y-6 pt-2">
              {/* DESCRIPTION */}
              <div className="border-b pb-6">
                <h1 className="text-xs tracking-widest font-bold uppercase text-foreground/80">Description</h1>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  Crafted with precision and care, this lounge chair blends modern minimalism with the warmth of natural materials. Perfect for living rooms, reading nooks, or any space that deserves a touch of quiet elegance.
                </p>
              </div>

              {/* DIMENSIONS - FIXED LAYOUT */}
              <div className="border-b pb-6">
                <h1 className="text-xs tracking-widest font-bold uppercase text-foreground/80">Dimensions</h1>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Width</p>
                    <p className="text-sm font-medium">32" (81 cm)</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Depth</p>
                    <p className="text-sm font-medium">35" (89 cm)</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Height</p>
                    <p className="text-sm font-medium">30" (76 cm)</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Seat Height</p>
                    <p className="text-sm font-medium">17" (43 cm)</p>
                  </div>
                </div>
              </div>

              <div className="border-b pb-6">
                <h1 className="text-xs tracking-widest font-bold uppercase text-foreground/80">Materials</h1>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  Solid Narra Wood, Premium Foam, Woven Fabric Upholstery.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl lg:text-4xl tracking-tight">You May Also Like</h2>
            <div className="h-[1px] w-12 bg-foreground/20 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-8 lg:gap-y-16">
            {relatedProducts.map((item) => (
              <div key={item.id} className="group flex flex-col cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden bg-accent/70">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/10 font-serif italic text-4xl">
                    Craftit
                  </div>
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between px-1">
                  <h3 className="text-xs font-medium uppercase tracking-widest">{item.name}</h3>
                  <p className="text-muted-foreground text-sm">₱{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}