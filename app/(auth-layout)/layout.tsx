import React from "react";

export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      
      {/* 
      <div className="bg-gradient-to-br from-muted to-background">
        {children}
      </div>
      
      The Dot Pattern:
         - bg-[spacing_px_spacing_px] sets the grid size
         - bg-[radial-gradient] creates the dots
         - opacity-20 (or 30) ensures it stays subtle in both modes
      */}
      <div 
        className="absolute inset-0 z-0 opacity-30 [background-image:radial-gradient(theme(colors.neutral.400)_1px,transparent_1px)] [background-size:20px_20px]" 
        aria-hidden="true"
      />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
}
