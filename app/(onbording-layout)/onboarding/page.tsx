"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Mas mainam gamitin ang useRouter sa Next.js

export default function Onboarding() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => {
      router.push("/"); 
    }, 2000);
  }

  return (
    <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="space-y-1 text-center mb-10">
        <h1 className="text-2xl lg:text-4xl font-serif tracking-tight">Complete your profile</h1>
        <p className="text-sm text-muted-foreground">Please provide your details for a smoother transaction.</p>
      </div>

      <FieldGroup className="flex flex-col"> 
        {/* Personal Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field>
            <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">First Name</FieldLabel>
            <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-12" placeholder="John"/>
          </Field>
          <Field>
            <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Last Name</FieldLabel>
            <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-12" placeholder="Doe"/>
          </Field>

          <Field>
            <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Phone Number</FieldLabel>
            <Input 
              type="tel" 
              inputMode="numeric" 
              value={phone} 
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); 
                setPhone(value);
              }} 
              className="h-12" 
              placeholder="09171234567" 
              maxLength={11} 
            />
          </Field>
          
          <Field>
            <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Gender</FieldLabel>
            <div className="relative">
              <select 
                value={gender} 
                onChange={(e) => setGender(e.target.value)} 
                className="w-full h-12 px-3 pr-10 text-sm border bg-background rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="" disabled>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </Field>
        </div>  

        <Field>
          <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Delivery Address</FieldLabel>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} className="h-12" placeholder="House No., Street, Barangay, City, Province" />
        </Field>
      </FieldGroup>

      <div className="mt-6">
        <Button 
          onClick={handleSave} 
          disabled={saved} 
          className="w-full h-12 text-xs uppercase tracking-widest font-bold transition-all"
        >
          {saved ? "Redirecting..." : "Save Profile Information"}
        </Button>
        
        <div className="h-5 mt-4 text-center">
          {saved && (
            <p className="text-xs text-green-600 dark:text-green-400 font-medium animate-in fade-in slide-in-from-left-2 duration-300">
              Changes saved successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}