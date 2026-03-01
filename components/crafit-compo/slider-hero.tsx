"use client"; 

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import Image from "next/image";

const heroSlides = [
  { id: 1, src: "/alden.png", alt: "Featured Craft 1" },
  { id: 2, src: "/furniture.png", alt: "Modern Sofa" }, 
  { id: 3, src: "/bobo.png", alt: "Wooden Table" },
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
      <div className="relative aspect-[4/5] w-[400px] border border-[#A67B5B]/20 p-4 rotate-3 backdrop-blur-sm bg-white/5 shadow-2xl">
        
        <div className="absolute -top-10 -left-10 text-[12rem] font-serif italic text-[#A67B5B]/10 select-none z-0">
          C
        </div>

        <div className="relative w-full h-full bg-[#EAD8C0] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={heroSlides[current].src}
                alt={heroSlides[current].alt}
                fill
                className="object-cover sepia-[.2] hover:sepia-0 transition-all duration-700"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {heroSlides.map((_, index) => (
              <div
                key={index}
                className={`h-1 transition-all duration-500 ${
                  current === index ? "w-6 bg-[#3E2723]" : "w-2 bg-[#3E2723]/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}