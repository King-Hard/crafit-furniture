import Image from "next/image";
import Link from "next/link";
import {ChevronDown} from "lucide-react";
import Hero from "@/components/crafit-compo/slider-hero";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden bg-[#FCF9F6] dark:bg-[#121212] transition-colors duration-500">
      
      <section className="relative w-screen h-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] bg-[#F3E5D8] dark:bg-[#1A1A1A] overflow-hidden flex items-center transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D9A066]/20 dark:from-[#A67B5B]/10 via-transparent to-transparent opacity-60" />
        
        <div className="relative z-10 px-6 md:px-16 lg:px-24 w-full max-w-[1800px] mx-auto">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[#8B5E3C] dark:text-[#D9A066] text-[12px] uppercase tracking-[0.4em] font-bold block mb-4">
                  Baliuag City • Pampanga
                </span>
                <h1 className="text-[#3E2723] dark:text-[#F3E5D8] text-7xl md:text-[10rem] font-serif leading-[0.8] tracking-tighter transition-colors">
                  The Art of <br /> 
                  <span className="italic font-light text-[#A67B5B] dark:text-[#D9A066]">Timeless Craft.</span>
                </h1>
              </div>
              
              <div className="flex items-start gap-8 max-w-xl py-2">
                <p className="text-[#5D4037] dark:text-[#A67B5B] text-sm md:text-base transition-colors">
                  Craftit is an all-in-one source for high-quality artisan furniture 
                  and customized woodworks. Designed for the home and comfort of Filipinos.
                </p>
              </div>
            </div>

            <Hero/>

          </div>
        </div>
      </section>

     {/* SECTION 2: SIGNATURE SERIES */}
      <section className="py-20 md:py-32 max-w-[1400px] mx-auto bg-[#FCF9F6] dark:bg-[#121212] transition-colors">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-12 md:mb-16 gap-6 px-2">
          <div className="flex flex-col items-center lg:items-start space-y-2 text-center lg:text-left">
            <h2 className="text-[12px] uppercase tracking-[0.4em] text-[#A67B5B] dark:text-[#D9A066] font-bold">
              The Essentials
            </h2>
            <p className="text-4xl md:text-7xl font-serif leading-none tracking-tighter text-[#3E2723] dark:text-[#F3E5D8]">
              Signature Features
            </p>
          </div>  
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-10 justify-items-center">
          <CategoryCard title="Product" desc="Timeless comfort" img="/category-furniture.jpg" />
          <CategoryCard title="Customization" desc="Tailored vision" img="/alden.png" />
          <CategoryCard title="Organic" desc="Premium timber" img="/category-woods.jpg" />
        </div>
      </section>

      {/* SECTION 3: PHILOSOPHY */}
      <section className="relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] bg-gradient-to-b from-[#FCF9F6] via-[#F3E5D8] to-[#EAD8C0] dark:from-[#121212] dark:via-[#1A1A1A] dark:to-[#000000] pt-10 pb-20 overflow-hidden transition-colors">        
        <div className="max-w-5xl mx-auto text-center px-6 space-y-12">
          <div className="space-y-4">
            <span className="text-[12px] uppercase tracking-[0.4em] text-[#8B5E3C] dark:text-[#D9A066] font-bold block opacity-70">
              Our Philosophy
            </span>
            <h2 className="text-6xl md:text-[10vw] font-serif leading-none italic text-[#3E2723] dark:text-[#F3E5D8] tracking-tighter transition-colors">
              Crafting <span className="not-italic font-sans font-black uppercase text-[#A67B5B]/10 dark:text-[#F3E5D8]/5">Legacy</span>
            </h2>
          </div>

          <div className="space-y-10">
            <h3 className="text-3xl md:text-5xl font-serif leading-[1.2] text-[#3E2723] dark:text-[#F3E5D8] max-w-3xl mx-auto italic tracking-tight transition-colors">
              "True luxury is felt in the <span className="not-italic font-sans font-bold underline underline-offset-8 decoration-[#A67B5B]/40 dark:decoration-[#D9A066]/30">silence</span> of the room."
            </h3>
            
            <p className="text-[#5D4037] dark:text-[#A67B5B] max-w-xl mx-auto leading-relaxed text-base lg:text-lg transition-colors">
              Meticulously handcrafted by Filipino artisans using sustainable timber, 
              ensuring your home tells a story of quality that lasts generations.
            </p>  

           <div className="pt-6 flex flex-col items-center gap-6">
            <Link 
              href="/about" 
              className="group flex flex-col items-center gap-4 text-[12px] uppercase tracking-[0.2em] font-bold text-[#3E2723] dark:text-[#F3E5D8]"
            >
              <span className="border-b border-[#3E2723]/60 dark:border-[#F3E5D8]/60 transition-all duration-300 group-hover:text-[#A67B5B] dark:group-hover:text-[#D9A066] group-hover:border-[#A67B5B] dark:group-hover:border-[#D9A066]">
                The Artisan Story
              </span>
              
              <ChevronDown 
                size={26} 
                className="animate-pulse text-[#A67B5B] dark:text-[#D9A066] transition-opacity group-hover:opacity-80" 
              />
            </Link>
          </div>
          </div>
        </div>
      </section>

    </main>
  );
}

function CategoryCard({ title, desc, img }: { title: string, desc: string, img: string }) {
  return (
    <div className="group relative w-[90%] md:w-full aspect-[3/4] overflow-hidden bg-[#EAD8C0] dark:bg-[#1A1A1A] transition-all duration-700 shadow-xl md:shadow-none">
      <Image 
        src={img} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 sepia-[.1] dark:sepia-[.3] group-hover:sepia-0" 
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/90 dark:from-black/80 via-transparent to-transparent opacity-80 transition-opacity" />
      
      <div className="absolute bottom-8 left-6 md:bottom-10 md:left-8 z-20 text-[#FCF9F6] space-y-2">
        <h3 className="text-4xl md:text-4xl font-serif tracking-tighter leading-none">
          {title}
        </h3>
        <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-[#D9A066]">
          {desc}
        </p>
      </div>
      
      <Link href="/furniture" className="absolute inset-0 z-30" />
    </div>
  );
}