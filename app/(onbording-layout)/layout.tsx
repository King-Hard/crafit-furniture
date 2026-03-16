import React from "react";

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-5xl px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-center h-16">
            <h1 className="text-xl lg:text-2xl tracking-[0.2em] font-bold uppercase font-sans">
              Craftit
            </h1>
          </div>
        </div>
      </nav>

      {/* Main Content Area: Centering Logic */}
      <main className="flex-1 flex items-center justify-center p-6 mt-16">
        <div className="w-full max-w-2xl">
          {children}
        </div>
      </main>
    </div>
  );
}