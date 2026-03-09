"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Upload, X, ChevronDown, Clock } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const furnitureTypes = [
  "Dining Table", "Coffee Table", "Study Desk", "Console Table",
  "Sofa", "Lounge Chair", "Accent Chair", "Ottoman",
  "Bed Frame", "Wardrobe", "Bookshelf", "Sideboard", "Other",
];

const materials = [
  "Narra Wood", "Mahogany", "Kamagong", "Acacia",
  "Plywood / Laminate", "Metal Frame", "Glass", "Fabric Upholstery",
  "Leather Upholstery", "Rattan / Wicker",
];

const budgetRanges = [
  "Under ₱10,000",
  "₱10,000 – ₱25,000",
  "₱25,000 – ₱50,000",
  "₱50,000 – ₱100,000",
  "Above ₱100,000",
];

export default function Customize() {
  const [furnitureType, setFurnitureType] = useState("");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [dimensions, setDimensions] = useState({ width: "", depth: "", height: "" });
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function handleRemoveImage() {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function toggleMaterial(material: string) {
    setSelectedMaterials((prev) =>
      prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]
    );
  }

  function handleSubmit() {
    window.scrollTo(0, 0);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="font-serif text-4xl lg:text-6xl tracking-tight">Request Received</h1>
        <div className="h-[1px] w-12 bg-foreground/20 mx-auto" />

        <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
          Thank you for your custom furniture request. Our team will review your submission and get back to you within 1–2 business days.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <Link href="/furniture" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:px-8 h-12 text-[10px] sm:text-xs uppercase tracking-widest font-bold"
            >
              Continue Shopping
            </Button>
          </Link>
          
          <Button
            variant="default"
            className="w-full sm:w-auto sm:px-12 h-12 text-[10px] sm:text-xs uppercase tracking-widest font-bold"
            onClick={() => {
              window.scrollTo(0, 0);
              setSubmitted(false);
            }}
          >
            New Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Breadcrumb */}
      <nav className="mx-auto px-6 lg:px-12 py-6">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <span className="text-foreground">Customize</span>
        </div>
      </nav>

      {/* Header */}
      <header className="mb-12 text-center px-4">
        <h1 className="font-serif text-foreground text-5xl lg:text-7xl tracking-tight">
          Custom Furniture
        </h1>
         <div className="h-[1px] w-12 bg-foreground/20 mx-auto mt-6" />
      </header>

      {/* Form */}
      <div className="mx-auto px-6 lg:px-12 max-w-3xl">
        <FieldGroup>

          {/* Furniture Type */}
          <Field>
            <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">
              Furniture Type
            </FieldLabel>
            <div className="relative">
              <select
                value={furnitureType}
                onChange={(e) => setFurnitureType(e.target.value)}
                className="w-full h-12 px-3 pr-10 text-sm border bg-background rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
              >
                <option value="" disabled>Select a furniture type</option>
                {furnitureTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </Field>

          {/* Dimensions */}
          <Field>
            <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">
              Dimensions (inches)
            </FieldLabel>
            <div className="grid grid-cols-3 gap-3">
              {(["width", "depth", "height"] as const).map((dim) => (
                <div key={dim} className="space-y-1.5">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground capitalize">{dim}</p>
                  <Input
                    type="number"
                    placeholder='e.g. 36"'
                    value={dimensions[dim]}
                    onChange={(e) => setDimensions((prev) => ({ ...prev, [dim]: e.target.value }))}
                    className="h-12"
                  />
                </div>
              ))}
            </div>
          </Field>

          {/* Materials */}
          <Field>
            <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">
              Preferred Materials <span className="text-muted-foreground font-normal normal-case tracking-normal">(select all that apply)</span>
            </FieldLabel>
            <div className="flex flex-wrap gap-2 mt-1">
              {materials.map((material) => (
                <button
                  key={material}
                  type="button"
                  onClick={() => toggleMaterial(material)}
                  className={`text-xs px-3 py-1.5 rounded-sm border transition-colors ${
                    selectedMaterials.includes(material)
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {material}
                </button>
              ))}
            </div>
          </Field>

          {/* Budget */}
          <Field>
            <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">
              Budget Range
            </FieldLabel>
            <div className="relative">
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full h-12 px-3 pr-10 text-sm border bg-background rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
              >
                <option value="" disabled>Select a budget range</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </Field>

          {/* Reference Image Upload */}
          <Field>
            <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">
              Reference Image <span className="text-muted-foreground font-normal normal-case tracking-normal">(optional)</span>
            </FieldLabel>

            {imagePreview ? (
              <div className="relative w-full aspect-video bg-accent/70 overflow-hidden rounded-lg">
                <Image src={imagePreview} alt="Reference" fill className="object-cover" />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 p-1.5 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-34 border border-dashed rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
              >
                <Upload size={20} strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-widest">Click to upload image</span>
                <span className="text-[10px]">PNG, JPG up to 10MB</span>
              </button>
            )}
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </Field>

          {/* Message */}
          <Field>
            <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">
              Additional Details
            </FieldLabel>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-30"
              placeholder="Describe your vision — colors, finish, special features, or any specific requirements..."
            />
          </Field>

          {/* Submit */}
          <Button
            variant="outline"
            className="w-full h-12 text-xs uppercase tracking-widest font-bold"
            onClick={handleSubmit}
          >
            Submit Request
          </Button>
        </FieldGroup>
      </div>
    </main>
  );
}