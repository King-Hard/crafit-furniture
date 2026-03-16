import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Pinagsama-samang data mula sa Chairs, Tables, Cabinets, at Beds
const ALL_PRODUCTS = [
  { id: 1, name: "Minimalist Lounge", price: "₱12,500", category: "Chairs", img: "/chair1.png" },
  { id: 2, name: "Solid Oak Dining", price: "₱35,000", category: "Tables", img: "/table1.png" },
  { id: 3, name: "Linear Sideboard", price: "₱28,000", category: "Cabinets", img: "/cabinet1.png" },
  { id: 4, name: "Siesta Platform", price: "₱45,000", category: "Beds", img: "/bed1.png" },
  { id: 5, name: "Artisan Stool", price: "₱8,200", category: "Chairs", img: "/chair2.jpg" },
  { id: 6, name: "Coffee Table Set", price: "₱12,500", category: "Tables", img: "/t2.jpg" },
  { id: 7, name: "Narra Wardrobe", price: "₱85,000", category: "Cabinets", img: "/cab2.jpg" },
  { id: 8, name: "Haraya King Frame", price: "₱58,000", category: "Beds", img: "/bed2.jpg" },
  // Maaari mo pang dagdagan ito para maging 12 o 16 items
];

export default function Furniture() {
  return (
    <main className="min-h-screen pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. BREADCRUMBS */}
      <nav className="mx-auto px-6 lg:px-12 py-6">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <span className="text-foreground">Furniture</span>
        </div>
      </nav>

      {/* 2. HEADER */}
      <header className="mb-6">
        <h1 className="font-serif text-center tracking-tight text-5xl lg:text-8xl text-foreground">
          Furniture
        </h1>
        <p className="text-center text-muted-foreground text-xs uppercase tracking-[0.5em] mt-4 font-medium">
          The Full Collection
        </p>
      </header>

      {/* 3. FILTER BUTTONS - Scrollable sa mobile para hindi mag-clutter */}
      <div className="flex items-center justify-start lg:justify-center py-6 gap-2 lg:gap-3 overflow-x-auto px-6 lg:px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">        
        <Button className="text-sm lg:text-base shrink-0">See all</Button>
        <Link href="/chairs">
          <Button variant="outline" className="text-sm lg:text-base shrink-0">Chairs</Button>
        </Link>

        <Link href="/tables">
          <Button variant="outline" className="text-sm lg:text-base shrink-0">Tables</Button>
        </Link>

        <Link href="/cabinets">
          <Button variant="outline" className="text-sm lg:text-base shrink-0">Cabinets</Button>
        </Link>

        <Link href="/bed-frames">
          <Button variant="outline" className="text-sm lg:text-base shrink-0">Bed Frames</Button>
        </Link>
      </div>

      {/* 4. UNIFIED GRID */}
      <div className="max-w-[1800px] mx-auto px-4 lg:px-12 mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 lg:gap-x-8 lg:gap-y-20">
          {ALL_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}

// 5. PRODUCT CARD
function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/furniture/${product.id}`}>
      <div className="group flex flex-col cursor-pointer">
        <div className="relative aspect-[3/4] overflow-hidden bg-accent/70">
          {/* Category Badge - Para alam ng user kung anong klase ito */}
          <div className="absolute top-4 left-4 z-10 text-[9px] uppercase tracking-widest bg-background/80 backdrop-blur-sm px-2 py-1 text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            {product.category}
          </div>

          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/10 font-serif italic text-4xl">
            Craftit
          </div>

          <Image
            src={product.img}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </div>

        <div className="mt-5 flex flex-col gap-1 px-1">
          <h3 className="text-foreground font-sans font-medium text-xs lg:text-sm uppercase tracking-wider">
            {product.name}
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground text-[13px]">{product.price}</p>
            <span className="text-[10px] text-muted-foreground/40 font-serif italic">Handcrafted</span>
          </div>
        </div>
      </div>
    </Link>
  );
}