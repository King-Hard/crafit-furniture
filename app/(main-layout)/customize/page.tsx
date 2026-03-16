"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Upload, X, ChevronDown, Info, HelpCircle, AlertTriangle, Calculator } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ─── Pricing Data ─────────────────────────────────────────────────────────────
const standardWoodTypes = ["Narra", "Mahogany", "Acacia", "Pine", "Kamagong", "Yakal", "Other"];

const woodMultipliers: Record<string, number> = {
  "Narra": 2.2,
  "Kamagong": 2.5,
  "Yakal": 2.0,
  "Mahogany": 1.8,
  "Acacia": 1.5,
  "Pine": 1.0,
  "Other": 1.3,
};

const woodLabels: Record<string, string> = {
  "Narra": "Premium",
  "Kamagong": "Premium",
  "Yakal": "High-Grade",
  "Mahogany": "High-Grade",
  "Acacia": "Mid-Grade",
  "Pine": "Standard",
  "Other": "Custom",
};

// Base prices (in PHP) at standard dimensions
const basePrices: Record<string, number> = {
  "chairs": 4500,
  "table": 8000,
  "cabinets": 12000,
  "bed-frames": 15000,
  "other": 8000,
};

// Standard reference volume per category (W x D x H in inches)
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

// ─── Estimation Logic ─────────────────────────────────────────────────────────
function computeEstimate(
  furnitureType: string,
  woodType: string,
  dimensions: { width: string; depth: string; height: string },
  bedSize: string,
): { low: number; high: number; breakdown: { label: string; value: string }[] } | null {
  // Prevent estimate for fully custom / unknown items
  if (!furnitureType || furnitureType === "other") return null;
  if (!woodType || woodType === "Other") return null;

  const base = basePrices[furnitureType] ?? 8000;
  const multiplier = woodMultipliers[woodType] ?? 1.3;

  // Dimension multiplier
  let dimMultiplier = 1;
  const w = parseFloat(dimensions.width);
  const d = parseFloat(dimensions.depth);
  const h = parseFloat(dimensions.height);
  const hasAllDims = !isNaN(w) && !isNaN(d) && !isNaN(h) && w > 0 && d > 0 && h > 0;

  if (hasAllDims) {
    const inputVolume = w * d * h;
    const refVolume = referenceVolumes[furnitureType] ?? inputVolume;
    dimMultiplier = Math.pow(inputVolume / refVolume, 0.6); // dampened scale
    dimMultiplier = Math.max(0.5, Math.min(dimMultiplier, 3.0)); // clamp
  }

  // Bed size preset multipliers
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

  const estimated = base * multiplier * dimMultiplier;
  const low = Math.round(estimated * 0.9 / 500) * 500;
  const high = Math.round(estimated * 1.15 / 500) * 500;

  const breakdown = [
    { label: "Furniture Type", value: furnitureCategories.find(c => c.id === furnitureType)?.label ?? furnitureType },
    { label: "Wood Type", value: `${woodType} (${woodLabels[woodType]})` },
    { label: "Wood Grade Multiplier", value: `${multiplier}×` },
    {
      label: "Size Factor",
      value: hasAllDims
        ? `${dimMultiplier.toFixed(2)}× (based on ${w}" × ${d}" × ${h}")`
        : bedSize && bedSize !== "Custom Size"
          ? `${dimMultiplier.toFixed(2)}× (${bedSize})`
          : "Standard size assumed"
    },
    { label: "Labor & Finishing", value: "Included in estimate" },
  ];

  return { low, high, breakdown };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Customize() {
  const [furnitureType, setFurnitureType] = useState("");
  const [customType, setCustomType] = useState("");
  const [bedSize, setBedSize] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [customMaterial, setCustomMaterial] = useState("");
  const [budget, setBudget] = useState("");
  const [dimensions, setDimensions] = useState({ width: "", depth: "", height: "" });
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeCategory = furnitureCategories.find((c) => c.id === furnitureType);
  const currentPlaceholders = activeCategory?.placeholders || { width: '0"', depth: '0"', height: '0"' };
  const showDimensionInputs = furnitureType !== "" && (furnitureType !== "bed-frames" || bedSize === "Custom Size");

  const estimate = computeEstimate(furnitureType, selectedMaterial, dimensions, bedSize);

  // Budget vs estimate warning (only shown when estimate exists)
  const selectedBudget = budgetRanges.find(b => b.label === budget);
  const budgetWarning = estimate && selectedBudget
    ? estimate.low > selectedBudget.max
      ? "Your selected budget may be lower than the estimated cost. The owner will provide a final quote."
      : estimate.high < selectedBudget.min
        ? "Your budget is higher than the estimate — you may have room for upgrades!"
        : null
    : null;

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
        <h1 className="font-serif text-4xl lg:text-6xl tracking-tight">Request Received</h1>
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
        <h1 className="font-serif text-foreground text-5xl lg:text-7xl tracking-tight">Custom Furniture</h1>
        <div className="h-[1px] w-12 bg-foreground/20 mx-auto mt-6" />
      </header>

      {/* 2-Column Layout */}
      <div className="mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">

          {/* ── LEFT: Form ── */}
          <div className="lg:col-span-6">
            <FieldGroup>
              {/* Furniture Type */}
              <Field>
                <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Furniture Type</FieldLabel>
                <div className="relative">
                  <select
                    value={furnitureType}
                    onChange={(e) => {
                      setFurnitureType(e.target.value);
                      setSelectedMaterial("");
                      setBedSize("");
                      setDimensions({ width: "", depth: "", height: "" });
                    }}
                    className="w-full h-12 px-3 pr-10 text-sm border bg-background rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                  >
                    <option value="" disabled>Select a furniture type</option>
                    {furnitureCategories.map((type) => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>

                {furnitureType === "other" && (
                  <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-top-1">
                    <Input 
                      placeholder="What furniture? (e.g. Center Table, Shoe Rack, Cat Bed)" 
                      value={customType} 
                      onChange={(e) => setCustomType(e.target.value)} 
                      className="h-12" 
                    />
                    <div className="p-3 border-l-2 border-muted bg-muted/20 flex gap-2">
                      <Info size={14} className="text-muted-foreground shrink-0 mt-1" />
                      <p className="text-xs lg:text-sm text-muted-foreground">
                        <span className="font-bold text-foreground">Note:</span> For custom items not in our list, the owner will provide a quote after reviewing your request.
                      </p>
                    </div>
                  </div>
                )}

                {furnitureType === "bed-frames" && (
                  <div className="mt-3 relative animate-in fade-in slide-in-from-top-1">
                    <select
                      value={bedSize}
                      onChange={(e) => setBedSize(e.target.value)}
                      className="w-full h-12 px-3 pr-10 text-sm border bg-background rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
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

              {/* Dimensions */}
              {showDimensionInputs && (
                <Field className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">
                    {furnitureType === "bed-frames" ? "Custom Dimensions (inches)" : "Dimensions (inches)"}
                  </FieldLabel>
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
                  <div className="mt-2 p-3 border-l-2 border-muted bg-muted/20 flex gap-2">
                    <HelpCircle size={14} className="text-muted-foreground shrink-0 mt-1" />
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      Not sure about dimensions? Leave it blank and describe what you need in the details below.
                      The owner will contact you to finalize the details.
                    </p>
                  </div>
                </Field>
              )}

              {/* Wood Type */}
              <Field>
                <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">
                  Wood Type <span className="text-muted-foreground font-normal normal-case tracking-normal">(select one)</span>
                </FieldLabel>
                <div className="flex flex-wrap gap-2 mt-1">
                  {furnitureType ? (
                    standardWoodTypes.map((material) => (
                      <button
                        key={material}
                        type="button"
                        onClick={() => handleSelectMaterial(material)}
                        className={`text-xs px-3 py-1.5 rounded-sm border transition-colors ${
                          selectedMaterial === material
                            ? "bg-foreground text-background border-foreground"
                            : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                        }`}
                      >
                        {material}
                        {woodLabels[material] && material !== "Other" && (
                          <span className={cn("ml-1.5 text-[9px] opacity-60")}>
                            {woodLabels[material] === "Premium" ? "★" : woodLabels[material] === "High-Grade" ? "◆" : ""}
                          </span>
                        )}
                      </button>
                    ))
                  ) : (
                    <p className="text-xs lg:text-sm text-muted-foreground">Select a furniture type above to see material options.</p>
                  )}
                </div>

                {selectedMaterial === "Other" && (
                  <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-top-1">
                    <Input 
                      placeholder="Specify other wood type or material" 
                      value={customMaterial} 
                      onChange={(e) => setCustomMaterial(e.target.value)} 
                      className="h-12" 
                    />
                    <div className="p-3 border-l-2 border-muted bg-muted/20 flex gap-2">
                      <Info size={14} className="text-muted-foreground shrink-0 mt-1" />
                      <p className="text-xs lg:text-sm text-muted-foreground">
                        <span className="font-bold text-foreground">Note:</span> Price estimate is not available for "Other" selections.
                        The owner will provide a quote after reviewing your request.
                      </p>
                    </div>
                  </div>
                )}
              </Field>

              {/* Budget */}
              <Field>
                <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Budget Range</FieldLabel>
                <div className="relative">
                  <select 
                    value={budget} 
                    onChange={(e) => setBudget(e.target.value)} 
                    className="w-full h-12 px-3 pr-10 text-sm border bg-background rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                  >
                    <option value="" disabled>Select a budget range</option>
                    {budgetRanges.map((range) => (
                      <option key={range.label} value={range.label}>{range.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>

                {/* Budget vs estimate warning */}
                {budgetWarning && (
                  <div className={cn(
                    "mt-3 p-3 border-l-2 flex gap-2 animate-in fade-in slide-in-from-top-1",
                    budgetWarning.includes("lower") ? "border-yellow-400 bg-yellow-50/50 dark:bg-yellow-950/20" : "border-green-400 bg-green-50/50 dark:bg-green-950/20"
                  )}>
                    <AlertTriangle size={14} className={cn("shrink-0 mt-0.5", budgetWarning.includes("lower") ? "text-yellow-500" : "text-green-500")} />
                    <p className="text-xs text-muted-foreground">{budgetWarning}</p>
                  </div>
                )}
              </Field>

              {/* Reference Image */}
              <Field>
                <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Reference Image <span className="text-muted-foreground font-normal normal-case tracking-normal">(optional)</span></FieldLabel>
                {imagePreview ? (
                  <div className="relative w-full aspect-video bg-accent/70 overflow-hidden rounded-lg">
                    <Image src={imagePreview} alt="Reference" fill className="object-cover" />
                    <button onClick={handleRemoveImage} className="absolute top-3 right-3 p-1.5 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors">
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
                    <span className="text-xs uppercase tracking-widest">Click to upload</span>
                  </button>
                )}
                <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </Field>

              {/* Additional Details */}
              <Field>
                <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Additional Details</FieldLabel>
                <Textarea 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  className="h-30" 
                  placeholder="Describe your vision — colors, finish, or special requirements..." 
                />
              </Field>

              <Button variant="outline" className="w-full h-12 text-xs uppercase tracking-widest font-bold" onClick={handleSubmit}>
                Submit Request
              </Button>
            </FieldGroup>
          </div>

          {/* ── RIGHT: Estimate Summary ── */}
          <div className="lg:col-span-6">
            <Card className="sticky top-24 p-8">
              <h1 className="uppercase tracking-[0.2em] text-sm lg:text-base">Price Estimate</h1>

              {furnitureType === "other" || selectedMaterial === "Other" ? (
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                  <AlertTriangle size={40} className="text-amber-500/80" />
                  <h2 className="text-base lg:text-xl font-medium">No automatic estimate available</h2>
                  <p className="text-xs lg:text-sm text-muted-foreground ">
                    For fully custom furniture types or non-standard materials, our owner will provide an accurate quote after reviewing your request and details.
                  </p>
                  <p className="text-xs lg:text-sm text-muted-foreground mt-2">
                    Please describe your project as clearly as possible in the "Additional Details" section and upload any reference images.
                  </p>
                </div>
              ) : !estimate ? (
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  <div className="flex items-center justify-center">
                    <Calculator size={40} className="text-muted-foreground" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-base lg:text-xl font-medium">Select furniture & wood to see estimate</h2>
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    Adding dimensions will make the estimate more accurate.
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
                    <p className="text-xs text-muted-foreground mt-1">Subject to final quote by the owner</p>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-1 mb-6">
                    <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-3">Estimate Breakdown</p>
                    {estimate.breakdown.map(({ label, value }) => (
                      <div key={label} className="flex items-start justify-between gap-4 py-2 border-b border-border/50 last:border-0">
                        <p className="text-xs lg:text-sm text-muted-foreground shrink-0">{label}</p>
                        <p className="text-xs lg:text-sm font-medium text-right">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Disclaimer */}
                  <div className="p-3 border-l-2 border-muted bg-muted/20 flex gap-2">
                    <Info size={14} className="text-muted-foreground shrink-0 mt-1" />
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