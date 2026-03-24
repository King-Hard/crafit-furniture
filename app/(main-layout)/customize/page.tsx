"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Upload, X, ChevronDown, Info, HelpCircle, AlertTriangle, Calculator, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ─── Constants & Data ─────────────────────────────────────────────────────────

const standardWoodTypes = ["Narra", "Yakal", "Mahogany", "Acacia", "Pine", "Cherry"];

const woodMultipliers: Record<string, number> = {
  "Narra": 2.2,
  "Yakal": 1.7,
  "Mahogany": 1.8,
  "Acacia": 1.5,
  "Pine": 1.0,
  "Cherry": 2.0,
  "Other": 1.3,
};

const woodLabels: Record<string, string> = {
  "Narra": "Premium",
  "Pine": "Premium",
  "Yakal": "High-Grade",
  "Mahogany": "High-Grade",
  "Acacia": "Mid-Grade",
  "Cherry": "Standard",
  "Other": "Custom",
};

const finishingOptions = [
  { id: "natural", label: "Natural / Clear", multiplier: 1.0, description: "Preserves the original wood grain with a protective clear coat." },
  { id: "varnish", label: "Gloss Varnish", multiplier: 1.1, description: "High-shine finish that adds depth and extra durability." },
  { id: "stain", label: "Wood Stain", multiplier: 1.15, description: "Alters the wood color (Walnut, Oak, etc.) while keeping the grain visible." },
  { id: "solid", label: "Solid Paint", multiplier: 1.25, description: "Opaque matte or gloss finish in a color of your choice." },
];

const basePrices: Record<string, number> = {
  "chairs": 4500,
  "table": 8000,
  "cabinets": 12000,
  "bed-frames": 15000,
  "other": 8000,
};

const referenceVolumes: Record<string, number> = {
  "chairs": 18 * 18 * 36,
  "table": 48 * 30 * 30,
  "cabinets": 36 * 20 * 72,
  "bed-frames": 60 * 75 * 14,
  "other": 36 * 24 * 36,
};

const budgetRanges = [
  { label: "Under ₱10,000", min: 0, max: 10000 },
  { label: "₱10,000 – ₱25,000", min: 10000, max: 25000 },
  { label: "₱25,000 – ₱50,000", min: 25000, max: 50000 },
  { label: "₱50,000 – ₱100,000", min: 50000, max: 100000 },
  { label: "Above ₱100,000", min: 100000, max: Infinity },
];

const furnitureCategories = [
  { id: "chairs", label: "Chairs", placeholders: { width: '18"', depth: '18"', height: '36"' } },
  { id: "table", label: "Table", placeholders: { width: '48"', depth: '30"', height: '30"' } },
  { id: "cabinets", label: "Cabinets", placeholders: { width: '36"', depth: '20"', height: '72"' } },
  {
    id: "bed-frames", label: "Bed Frames",
    sizes: ["Single (36\" x 75\")", "Semi-Double (48\" x 75\")", "Double (54\" x 75\")", "Queen (60\" x 75\")", "King (72\" x 78\")", "Custom Size"],
    placeholders: { width: '0"', depth: '0"', height: '0"' }
  },
  { id: "other", label: "Other", placeholders: { width: '0"', depth: '0"', height: '0"' } },
];

// ─── Logic ───────────────────────────────────────────────────────────────────

function computeEstimate(
  furnitureType: string,
  woodType: string,
  dimensions: { width: string; depth: string; height: string },
  bedSize: string,
  finishingId: string
): { low: number; high: number; breakdown: { label: string; value: string }[] } | null {
  if (!furnitureType || furnitureType === "other") return null;

  const base = basePrices[furnitureType] ?? 8000;
  const woodMult = woodMultipliers[woodType] ?? 1.3;
  const finish = finishingOptions.find(f => f.id === finishingId);
  const finishMult = finish?.multiplier ?? 1.0;

  let dimMultiplier = 1;
  const w = parseFloat(dimensions.width);
  const d = parseFloat(dimensions.depth);
  const h = parseFloat(dimensions.height);
  const hasAllDims = !isNaN(w) && !isNaN(d) && !isNaN(h) && w > 0 && d > 0 && h > 0;

  if (hasAllDims) {
    const inputVolume = w * d * h;
    const refVolume = referenceVolumes[furnitureType] ?? inputVolume;
    dimMultiplier = Math.pow(inputVolume / refVolume, 0.6);
    dimMultiplier = Math.max(0.5, Math.min(dimMultiplier, 3.0));
  }

  if (furnitureType === "bed-frames" && bedSize && bedSize !== "Custom Size") {
    const bedMultipliers: Record<string, number> = {
      "Single (36\" x 75\")": 0.7,
      "Semi-Double (48\" x 75\")": 0.85,
      "Double (54\" x 75\")": 1.0,
      "Queen (60\" x 75\")": 1.15,
      "King (72\" x 78\")": 1.3,
    };
    dimMultiplier = bedMultipliers[bedSize] ?? 1.0;
  }

  const estimated = base * woodMult * finishMult * dimMultiplier;
  const low = Math.round(estimated * 0.9 / 500) * 500;
  const high = Math.round(estimated * 1.15 / 500) * 500;

  const breakdown = [
    { label: "Furniture Type", value: furnitureCategories.find(c => c.id === furnitureType)?.label ?? furnitureType },
    { label: "Wood Type", value: `${woodType} (${woodLabels[woodType]})` },
    { label: "Finishing Style", value: finish?.label ?? "Standard" },
    { label: "Material Multiplier", value: `${(woodMult * finishMult).toFixed(2)}×` },
    {
      label: "Size Factor",
      value: hasAllDims
        ? `${dimMultiplier.toFixed(2)}× (${w}"×${d}"×${h}")`
        : bedSize && bedSize !== "Custom Size"
          ? `${dimMultiplier.toFixed(2)}× (${bedSize})`
          : "Standard size assumed"
    },
  ];

  return { low, high, breakdown };
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Customize() {
  const [furnitureType, setFurnitureType] = useState("");
  const [customType, setCustomType] = useState("");
  const [bedSize, setBedSize] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [customMaterial, setCustomMaterial] = useState("");
  const [finishing, setFinishing] = useState("natural");
  const [budget, setBudget] = useState("");
  const [dimensions, setDimensions] = useState({ width: "", depth: "", height: "" });
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeCategory = furnitureCategories.find((c) => c.id === furnitureType);
  const currentPlaceholders = activeCategory?.placeholders || { width: '0"', depth: '0"', height: '0"' };
  const showDimensionInputs = furnitureType !== "" && (furnitureType !== "bed-frames" || bedSize === "Custom Size");
  const isWoodSelected = selectedMaterial !== "";

  const estimate = computeEstimate(furnitureType, selectedMaterial, dimensions, bedSize, finishing);

  const selectedBudget = budgetRanges.find(b => b.label === budget);
  const budgetWarning = estimate && selectedBudget
    ? estimate.low > selectedBudget.max
      ? "Your selected budget may be lower than the estimated cost. The owner will provide a final quote."
      : estimate.high < selectedBudget.min
        ? "Your budget is higher than the estimate — you may have room for upgrades!"
        : null
    : null;

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const availableSlots = 3 - images.length;
    const filesToAdd = files.slice(0, availableSlots);
    const newImages = filesToAdd.map(file => ({ file, preview: URL.createObjectURL(file) }));
    setImages(prev => [...prev, ...newImages]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleRemoveImage(index: number) {
    setImages(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview); 
      updated.splice(index, 1);
      return updated;
    });
  }

  function handleSelectMaterial(material: string) {
    if (selectedMaterial === material) {
      setSelectedMaterial("");
      if (material === "Other") setCustomMaterial("");
    } else {
      setSelectedMaterial(material);
      if (material !== "Other") setCustomMaterial("");
    }
  }

  function handleSubmit() {
    window.scrollTo(0, 0);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="font-serif text-4xl lg:text-6xl tracking-tight text-foreground">Request Received</h1>
        <div className="h-[1px] w-12 bg-foreground/20 mx-auto" />
        <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
          Thank you for your custom furniture request. Our team will review your submission and get back to you within 1–2 business days.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <Link href="/furniture" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:px-8 h-12 text-[10px] sm:text-xs uppercase tracking-widest font-bold">
              Continue Shopping
            </Button>
          </Link>
          <Button variant="default" className="w-full sm:w-auto sm:px-12 h-12 text-[10px] sm:text-xs uppercase tracking-widest font-bold"
            onClick={() => { window.scrollTo(0, 0); setSubmitted(false); }}>
            New Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-24 animate-in fade-in duration-700">
      <nav className="mx-auto px-6 lg:px-12 py-6">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <span className="text-foreground">Customize</span>
        </div>
      </nav>

      <header className="mb-12 text-center px-4">
        <h1 className="font-serif text-foreground text-5xl lg:text-7xl tracking-tight">Custom Furniture</h1>
        <div className="h-[1px] w-12 bg-foreground/20 mx-auto mt-6" />
      </header>

      <div className="mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-12">

          {/* ── LEFT: Form ── */}
          <div className="lg:col-span-6">
            <FieldGroup>
              {/* Step 1: Furniture Type */}
              <Field>
                <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">1. Select Furniture Type</FieldLabel>
                <div className="relative">
                  <select
                    value={furnitureType}
                    onChange={(e) => {
                      setFurnitureType(e.target.value);
                      setSelectedMaterial("");
                    }}
                    className="w-full h-12 px-3 pr-10 text-sm border bg-background rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="" disabled>What are we building?</option>
                    {furnitureCategories.map((type) => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
                {furnitureType === "other" && (
                  <div className="mt-3">
                    <Input placeholder="Center Table, Shoe Rack, etc." value={customType} onChange={(e) => setCustomType(e.target.value)} className="h-12" />
                  </div>
                )}
                {furnitureType === "bed-frames" && (
                  <div className="mt-3 relative">
                    <select
                      value={bedSize}
                      onChange={(e) => setBedSize(e.target.value)}
                      className="w-full h-12 px-3 pr-10 text-sm border bg-background rounded-lg appearance-none"
                    >
                      <option value="" disabled>Select Bed Size</option>
                      {activeCategory?.sizes?.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                )}
              </Field>

              {/* Step 2: Wood Type */}
              {furnitureType && (
                <Field className="animate-in fade-in slide-in-from-top-2">
                  <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">2. Choose Wood Type</FieldLabel>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {standardWoodTypes.map((material) => (
                      <button
                        key={material}
                        type="button"
                        onClick={() => handleSelectMaterial(material)}
                        className={cn(
                          "text-[10px] uppercase tracking-wider px-4 py-2 rounded-sm border transition-all",
                          selectedMaterial === material
                            ? "bg-foreground text-background border-foreground font-bold shadow-md"
                            : "border-border text-muted-foreground hover:border-foreground/50"
                        )}
                      >
                        {material}
                        {woodLabels[material] && material !== "Other" && (
                          <span className="ml-2 font-normal">[{woodLabels[material]}]</span>
                        )}
                      </button>
                    ))}
                  </div>
                </Field>
              )}

              {/* Step 3: Conditional Fields */}
              {isWoodSelected && (
                <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="h-[1px] w-full bg-border/50" />
                  
                  {/* Finishing */}
                  <Field>
                    <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">3. Select Finishing Style</FieldLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                      {finishingOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFinishing(opt.id)}
                          className={cn(
                            "flex flex-col items-start p-4 border rounded-lg transition-all text-left",
                            finishing === opt.id
                              ? "border-foreground bg-foreground/[0.02] ring-1 ring-foreground"
                              : "border-border hover:border-foreground/40 hover:bg-muted/30"
                          )}
                        >
                          <div className="flex justify-between w-full items-center mb-1">
                            <span className="text-xs font-bold uppercase tracking-tight">{opt.label}</span>
                            {finishing === opt.id && <Check size={14} className="text-foreground" />}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{opt.description}</p>
                        </button>
                      ))}
                    </div>
                  </Field>

                  {/* Dimensions */}
                  {showDimensionInputs && (
                    <Field>
                      <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">4. Dimensions (inches)</FieldLabel>
                      <div className="grid grid-cols-3 gap-3">
                        {(["width", "depth", "height"] as const).map((dim) => (
                          <div key={dim} className="space-y-1.5">
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground capitalize">{dim}</p>
                            <Input
                              type="number"
                              placeholder={currentPlaceholders[dim]}
                              value={dimensions[dim]}
                              onChange={(e) => setDimensions((prev) => ({ ...prev, [dim]: e.target.value }))}
                              className="h-12"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex gap-2 p-3 bg-muted/50 rounded-lg">
                        <HelpCircle size={14} className="shrink-0 mt-1" />
                        <p className="text-xs lg:text-sm text-muted-foreground">
                          Not sure about dimensions? Leave it blank and describe what you need in the details below. The owner will contact you to finalize the details.
                        </p>
                      </div>
                    </Field>
                  )}

                  {/* Budget */}
                  <Field>
                    <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">5. Budget Range</FieldLabel>
                    <div className="relative">
                      <select 
                        value={budget} 
                        onChange={(e) => setBudget(e.target.value)} 
                        className="w-full h-12 px-3 pr-10 text-sm border bg-background rounded-lg appearance-none"
                      >
                        <option value="" disabled>Select range</option>
                        {budgetRanges.map((range) => (
                          <option key={range.label} value={range.label}>{range.label}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                    {budgetWarning && (
                      <div className="mt-3 flex gap-2 p-3 bg-muted/50 rounded-lg">
                        <Info size={14} className=" shrink-0 mt-1" />
                        <p className="text-xs lg:text-sm text-muted-foreground">{budgetWarning}</p>
                      </div>
                    )}
                  </Field>

                  {/* Images */}
                  <Field>
                    <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">6. Reference Images ({images.length}/3)</FieldLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {images.map((img, index) => (
                        <div key={index} className="relative aspect-video bg-muted rounded-lg border overflow-hidden">
                          <Image src={img.preview} alt="Reference" fill className="object-cover" />
                          <button onClick={() => handleRemoveImage(index)} className="absolute top-2 right-2 p-1 bg-background/80 rounded-full hover:bg-destructive hover:text-white transition-all">
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                      {images.length < 3 && (
                        <button type="button" onClick={() => fileInputRef.current?.click()} className={cn("h-40 border border-dashed rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-all", images.length === 0 && "sm:col-span-2")}>
                          <Upload size={20} />
                          <span className="text-[10px] uppercase font-semibold">Upload Inspo</span>
                        </button>
                      )}
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                  </Field>

                  <Field>
                    <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">7. Additional Details</FieldLabel>
                    <Textarea 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)} 
                      className="h-32 resize-none" 
                      placeholder="Special instructions or requests..." 
                    />
                  </Field>

                  <Button variant="outline" className="w-full h-12 text-xs uppercase tracking-widest font-bold" onClick={handleSubmit}>
                    Submit Request
                  </Button>
                </div>
              )}
            </FieldGroup>
          </div>

          {/* ── RIGHT: Estimate Summary ── */}
          <div className="lg:col-span-6">
            <Card className="sticky top-24 p-8">
              <h1 className="uppercase tracking-[0.2em] text-sm lg:text-base">Price Estimate</h1>

              {furnitureType === "other" || selectedMaterial === "Other" ? (
                <div className="flex flex-col items-center justify-center gap-4 text-center py-20">
                  <AlertTriangle size={40} className="text-amber-500/80" />
                  <h2 className="text-base lg:text-xl font-medium">No automatic estimate available</h2>
                  <p className="text-xs lg:text-sm text-muted-foreground ">
                    For custom furniture or wood type our owner will provide an accurate quote after reviewing your request and details.
                  </p>
                  <p className="text-xs lg:text-sm text-muted-foreground mt-2">
                    Please describe your project as clearly as possible in the "Additional Details" section and upload any reference images.
                  </p>
                </div>
              ) : !estimate ? (
                <div className="flex flex-col items-center justify-center gap-4 text-center py-20 opacity-50">
                  <Calculator size={48} strokeWidth={1} />
                  <p className="">
                    Choose a furniture type and wood <br /> to see initial pricing.
                  </p>
                </div>
              ) : (
                <>
                  {/* Estimate Range */}
                  <div className="bg-muted/30 rounded-xl p-6 text-center space-y-1 mb-6">
                    <p className="text-[12px] lg:text-xs uppercase font-medium text-muted-foreground">Estimated Price Range</p>
                    <p className="text-2xl lg:text-4xl font-semibold tracking-tight">
                      ₱{estimate.low.toLocaleString()} – ₱{estimate.high.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">(PHP) Philippine Peso</p>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-3">Estimate Breakdown</p>
                    {estimate.breakdown.map(({ label, value }) => (
                      <div key={label} className="flex items-start justify-between gap-4 py-2 border-b border-border/50 last:border-0">
                        <p className="text-xs lg:text-sm text-muted-foreground shrink-0">{label}</p>
                        <p className="text-xs lg:text-sm font-medium text-right">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Disclaimer */}
                  <div className="flex gap-2 p-3 bg-muted/50 rounded-lg">
                        <Info size={14} className="shrink-0 mt-1" />
                    <p className="text-xs lg:text-sm leading-relaxed text-muted-foreground">
                      This is an <span className="font-semibold text-foreground">initial estimate only</span> to help you plan your budget. The final price will be confirmed by our owner based on technical complexity, availability of materials, and current market rates.
                    </p>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}