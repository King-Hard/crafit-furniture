"use client"; 

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import Image from "next/image";

const heroSlides = [
  { id: 1, src: "/alden1.png", alt: "Featured Craft" },
  { id: 2, src: "/furniture2.png", alt: "Modern Sofa" }, 
  { id: 3, src: "/bobo3.png", alt: "Wooden Table" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 3000); 
    return () => clearInterval(timer);
  }, []);

  return (    
    <div className="hidden lg:flex justify-end pr-12">
      <div className="relative aspect-[4/5] w-[450px] border border-[#A67B5B]/10 dark:border-[#F3E5D8]/5 p-4 bg-[#FCF9F6] dark:bg-[#121212] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-colors duration-700">
        
        <div className="absolute -top-12 -left-12 text-[14rem] font-serif italic text-[#A67B5B]/5 dark:text-[#F3E5D8]/5 select-none z-0">
          C
        </div>

        <div className="relative w-full h-full overflow-hidden bg-[#F3E5D8]/20 dark:bg-[#1A1A1A]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ 
                duration: 1, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={heroSlides[current].src}
                alt={heroSlides[current].alt}
                fill
                priority
                className="object-cover transition-all duration-1000 grayscale-[0.3] hover:grayscale-0"
              />
              
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 dark:to-black/40" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className="relative h-8 flex items-center group"
              >
                <div
                  className={`h-[1px] transition-all duration-500 ease-in-out ${
                    current === index 
                      ? "w-12 bg-[#3E2723] dark:bg-[#F3E5D8]" 
                      : "w-6 bg-[#3E2723]/10 dark:bg-[#F3E5D8]/10 group-hover:bg-[#3E2723]/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}