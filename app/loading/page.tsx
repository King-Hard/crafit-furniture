"use client";

import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { GiHandSaw } from "react-icons/gi";

export default function GlobalLoading() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/onboarding";
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-muted to-background"
      style={{ minHeight: "100dvh" }}
    >
      <div className="flex flex-col items-center px-6">
        <div className="flex items-center gap-2 md:gap-4 animate-pulse">
          <GiHandSaw 
            className="size-8 sm:size-10 md:size-12 lg:size-14 text-foreground"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.2em] font-bold uppercase font-sans">
            Craftit
          </h1>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6 text-sm md:text-lg font-medium text-muted-foreground">
          <Spinner className="size-4 md:size-5" />
          <span className="tracking-widest uppercase text-[10px] md:text-sm">
            Loading...
          </span>
        </div>

      </div>
    </div>
  );
}