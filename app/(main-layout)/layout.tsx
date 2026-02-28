import Header from "@/components/crafit-compo/header";
import React from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header/>
        {children}
    </div>
  );
}