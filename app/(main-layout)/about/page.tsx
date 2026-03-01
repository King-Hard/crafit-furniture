import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <main className="min-h-screen bg-[#FCF9F6] dark:bg-[#121212] transition-colors">
      
      {/* SECTION 1: THE ORIGIN (HISTORY) */}
      <section className="py-24 px-6 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="">
              <h1 className="text-5xl lg:text-8xl font-serif tracking-tighter">
                Our Story
              </h1>
            </div>
            
            <div className="space-y-8 leading-relaxed text-lg text-muted-foreground">
              <div className="text-justify space-y-4">
                <p>
                  Began with a singular vision: to restore the dignity of traditional woodworking and furniture design in the Philippines. From a modest workshop in Bulacan, we have evolved into a premier destination for collectors seeking a marriage of heritage and modern aesthetics.
                </p>

                <p>
                  We do not simply manufacture chairs or tables; we build "heirlooms"—functional art pieces with a soul, designed to witness the passing of generations. Every curve and joint is a result of immense patience and a deep-seated love for the craft.
                </p>
              </div>

              <div className="">
                <Link 
                  href="/furniture" 
                  className="group inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] transition-all hover:gap-4"
                >
                  <span className="text-foreground border-b border-foreground transition-colors duration-300 group-hover:text-muted-foreground group-hover:border-muted-foreground">
                    Explore our furniture
                  </span>
                  <ArrowRight 
                    size={16} 
                    className="text-foreground transition-all duration-300 group-hover:text-muted-foreground" 
                  />
                </Link>
              </div>

            </div>
          </div>

          {/* Decorative Image Container */}
          <div className="relative aspect-[4/5] lg:aspect-square border border-[#3E2723]/5 dark:border-[#F3E5D8]/5 p-6 rotate-1 hover:rotate-0 transition-transform duration-700">
            <div className="relative w-full h-full overflow-hidden bg-[#F3E5D8] dark:bg-[#1A1A1A]">
               <Image 
                 src="/alden.png" 
                 alt="The Artisan Workshop" 
                 fill 
                 className="object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-1000"
               />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}