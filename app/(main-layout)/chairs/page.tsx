import Link from "next/link";
import Image from "next/image";

// Mock data para sa malinis na management ng products
const CHAIR_PRODUCTS = [
  { id: 1, name: "Minimalist Lounge", price: "₱12,500", img: "/chair1.jpg" },
  { id: 2, name: "Artisan Stool", price: "₱8,200", img: "/chair2.jpg" },
  { id: 3, name: "Sculptural Chair", price: "₱15,400", img: "/chair3.jpg" },
  { id: 4, name: "Modern Spindle", price: "₱10,000", img: "/chair4.jpg" },
  { id: 5, name: "Core Armchair", price: "₱22,000", img: "/chair5.jpg" },
  { id: 6, name: "Industrial Oak", price: "₱6,500", img: "/chair6.jpg" },
  { id: 7, name: "Heritage Rocker", price: "₱25,000", img: "/chair7.jpg" },
  { id: 8, name: "Cane Dining", price: "₱11,000", img: "/chair8.jpg" },
];

export default function Chairs() {
  return (
    <main className="min-h-screen pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. BREADCRUMBS */}
      <nav className="mx-auto px-6 lg:px-12 py-6">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <Link href="/furniture" className="hover:text-foreground transition-colors">Furniture</Link>
          <span className="opacity-50">/</span>
          <span className="text-foreground">Chairs</span>
        </div>
      </nav>

      {/* 2. HEADER - Serif for Elegance */}
      <header className="mb-12 text-center px-4">
        <h1 className="font-serif text-foreground text-5xl lg:text-7xl tracking-tight">
          Chairs
        </h1>
        <div className="h-[1px] w-12 bg-foreground/20 mx-auto mt-6" />
      </header>

      {/* 3. PRODUCT GRID */}
      <div className="max-w-[1800px] mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-8 lg:gap-y-16">
          {CHAIR_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
    </main>
  );
}

// 4. PRODUCT CARD COMPONENT
function ProductCard({ product }: { product: any }) {
  return (
    <div className="group flex flex-col cursor-pointer">
      {/* Image Container - Using Aspect Ratio for consistency */}
      <div className="relative aspect-[3/4] overflow-hidden bg-accent/70 transition-all">
        {/* Placeholder label para makita mo yung positioning habang wala pang images */}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-serif italic text-4xl">
           Craftit
        </div>
        
        {/* Actual Image */}
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="mt-4 flex items-center justify-between">
        <h3 className="text-foreground font-sans font-medium text-sm lg:text-base uppercase">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm tracking-wide">
          {product.price}
        </p>
      </div>
    </div>
  );
}