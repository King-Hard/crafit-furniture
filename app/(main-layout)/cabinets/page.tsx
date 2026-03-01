import Link from "next/link";
import Image from "next/image";

const CABINET_PRODUCTS = [
  { id: 1, name: "Linear Sideboard", price: "₱28,000", img: "/cab1.jpg" },
  { id: 2, name: "Narra Wardrobe", price: "₱85,000", img: "/cab2.jpg" },
  { id: 3, name: "Floating Console", price: "₱15,500", img: "/cab3.jpg" },
  { id: 4, name: "Glass Vitrine", price: "₱42,000", img: "/cab4.jpg" },
  { id: 5, name: "Modular Credenza", price: "₱34,000", img: "/cab5.jpg" },
  { id: 6, name: "Aparador Classic", price: "₱48,000", img: "/cab6.jpg" },
  { id: 7, name: "Tall Bookcase", price: "₱19,500", img: "/cab7.jpg" },
  { id: 8, name: "Sliding Buffet", price: "₱31,000", img: "/cab8.jpg" },
];

export default function Cabinets() {
  return (
    <main className="min-h-screen bg-background pb-20">
      <nav className="mx-auto px-6 lg:px-12 py-6">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <Link href="/furniture" className="hover:text-foreground transition-colors">Furniture</Link>
          <span className="opacity-50">/</span>
          <span className="text-foreground">Cabinets</span>
        </div>
      </nav>

      <header className="mb-12 text-center px-4">
        <h1 className="font-serif text-foreground text-5xl lg:text-7xl tracking-tight">Cabinets</h1>
        <div className="h-[1px] w-12 bg-foreground/20 mx-auto mt-6" />
      </header>

      <div className="max-w-[1800px] mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-8 lg:gap-y-16">
          {CABINET_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <div className="group flex flex-col cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-accent/30 transition-all">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-serif italic text-4xl">Craftit</div>
        <Image src={product.img} alt={product.name} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <h3 className="text-foreground font-sans font-medium text-sm lg:text-base uppercase">{product.name}</h3>
        <p className="text-muted-foreground text-sm tracking-wide">{product.price}</p>
      </div>
    </div>
  );
}