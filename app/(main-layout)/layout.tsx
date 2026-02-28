import Footer from "@/components/crafit-compo/footer";
import Header from "@/components/crafit-compo/header";
import React from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow w-full px-4 md:px-8">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}