"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Archive, Pencil, Plus, Search, Trash2,
  Package, TreePine, AlertTriangle, Layers, X, ChevronDown,
} from "lucide-react";
import React from "react";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";
type MaterialStatus = "Available" | "Low" | "Out";
type MaterialUnit = "board feet" | "meters" | "kg" | "sheets" | "pieces" | "liters";
type MaterialCategory = "Wood" | "Fabric & Upholstery" | "Metal" | "Glass" | "Finishing" | "Hardware";

interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: StockStatus;
  materialsUsed: { materialId: number; quantity: number }[];
}

interface RawMaterial {
  id: number;
  name: string;
  category: MaterialCategory;
  stock: number;
  unit: MaterialUnit;
  reorderPoint: number;
  status: MaterialStatus;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const initialProducts: Product[] = [
  { id: 1, name: "Mahogany Dining Table", category: "Dining", stock: 12, price: 18500, status: "In Stock", materialsUsed: [{ materialId: 2, quantity: 20 }, { materialId: 9, quantity: 4 }] },
  { id: 2, name: "L-Shape Sofa", category: "Living Room", stock: 3, price: 24000, status: "Low Stock", materialsUsed: [{ materialId: 5, quantity: 8 }, { materialId: 6, quantity: 2 }, { materialId: 9, quantity: 6 }] },
  { id: 3, name: "Queen Bed Frame", category: "Bedroom", stock: 0, price: 12000, status: "Out of Stock", materialsUsed: [{ materialId: 1, quantity: 30 }, { materialId: 9, quantity: 8 }] },
  { id: 4, name: "Office Chair", category: "Office", stock: 24, price: 4500, status: "In Stock", materialsUsed: [{ materialId: 5, quantity: 3 }, { materialId: 7, quantity: 1 }, { materialId: 9, quantity: 4 }] },
  { id: 5, name: "Wooden Bookshelf", category: "Living Room", stock: 2, price: 6800, status: "Low Stock", materialsUsed: [{ materialId: 3, quantity: 15 }, { materialId: 9, quantity: 2 }] },
  { id: 6, name: "Coffee Table", category: "Living Room", stock: 8, price: 7200, status: "In Stock", materialsUsed: [{ materialId: 4, quantity: 10 }, { materialId: 8, quantity: 1 }] },
  { id: 7, name: "Wardrobe Cabinet", category: "Bedroom", stock: 0, price: 15000, status: "Out of Stock", materialsUsed: [{ materialId: 3, quantity: 25 }, { materialId: 9, quantity: 6 }] },
  { id: 8, name: "Study Desk", category: "Office", stock: 6, price: 5500, status: "In Stock", materialsUsed: [{ materialId: 2, quantity: 12 }, { materialId: 9, quantity: 3 }] },
];

const initialMaterials: RawMaterial[] = [
  { id: 1, name: "Narra Lumber", category: "Wood", stock: 120, unit: "board feet", reorderPoint: 50, status: "Available" },
  { id: 2, name: "Mahogany Lumber", category: "Wood", stock: 45, unit: "board feet", reorderPoint: 40, status: "Low" },
  { id: 3, name: "Plywood (Marine Board)", category: "Wood", stock: 30, unit: "sheets", reorderPoint: 20, status: "Available" },
  { id: 4, name: "Acacia Slab", category: "Wood", stock: 8, unit: "pieces", reorderPoint: 10, status: "Low" },
  { id: 5, name: "Fabric (Gray)", category: "Fabric & Upholstery", stock: 60, unit: "meters", reorderPoint: 20, status: "Available" },
  { id: 6, name: "Foam Padding", category: "Fabric & Upholstery", stock: 5, unit: "kg", reorderPoint: 10, status: "Low" },
  { id: 7, name: "Steel Pipe (1 inch)", category: "Metal", stock: 0, unit: "pieces", reorderPoint: 15, status: "Out" },
  { id: 8, name: "Tempered Glass", category: "Glass", stock: 12, unit: "pieces", reorderPoint: 5, status: "Available" },
  { id: 9, name: "Wood Stain (Dark Walnut)", category: "Finishing", stock: 18, unit: "liters", reorderPoint: 10, status: "Available" },
  { id: 10, name: "Cabinet Hinges", category: "Hardware", stock: 3, unit: "pieces", reorderPoint: 20, status: "Low" },
  { id: 11, name: "Kamagong Lumber", category: "Wood", stock: 0, unit: "board feet", reorderPoint: 30, status: "Out" },
  { id: 12, name: "Pine Lumber", category: "Wood", stock: 200, unit: "board feet", reorderPoint: 60, status: "Available" },
];

// ─── Styles & Config ──────────────────────────────────────────────────────────

const stockStatusStyles: Record<StockStatus, string> = {
  "In Stock": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "Low Stock": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  "Out of Stock": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const materialStatusStyles: Record<MaterialStatus, string> = {
  "Available": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "Low": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  "Out": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const productCategories = ["All", "Dining", "Living Room", "Bedroom", "Office"];
const materialCategoryOptions: (MaterialCategory | "All")[] = ["All", "Wood", "Fabric & Upholstery", "Metal", "Glass", "Finishing", "Hardware"];
const materialUnits: MaterialUnit[] = ["board feet", "meters", "kg", "sheets", "pieces", "liters"];

// ─── Modal Component ──────────────────────────────────────────────────────────

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-semibold text-sm">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <X size={15} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}

function SelectInput({ value, onChange, children, className = "" }: { value: string; onChange: (v: string) => void; children: React.ReactNode; className?: string }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-10 px-3 pr-8 text-sm border bg-background rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-ring text-foreground ${className}`}
      >
        {children}
      </select>
      <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Inventory() {
  const [activeTab, setActiveTab] = useState<"products" | "materials">("products");

  // Products state
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<StockStatus | "All">("All");
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);

  // Materials state
  const [materials, setMaterials] = useState<RawMaterial[]>(initialMaterials);
  const [materialSearch, setMaterialSearch] = useState("");
  const [materialCategoryFilter, setMaterialCategoryFilter] = useState<MaterialCategory | "All">("All");
  const [materialStatusFilter, setMaterialStatusFilter] = useState<MaterialStatus | "All">("All");

  // Modal state
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [showEditMaterial, setShowEditMaterial] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<RawMaterial | null>(null);

  // Add Product form state
  const [newProduct, setNewProduct] = useState({ name: "", category: "Dining", stock: "", price: "", status: "In Stock" as StockStatus });

  // Add Material form state
  const [newMaterial, setNewMaterial] = useState({ name: "", category: "Wood" as MaterialCategory, stock: "", unit: "board feet" as MaterialUnit, reorderPoint: "", status: "Available" as MaterialStatus });

  // Derived
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "All" || p.category === categoryFilter;
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const filteredMaterials = materials.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(materialSearch.toLowerCase());
    const matchCategory = materialCategoryFilter === "All" || m.category === materialCategoryFilter;
    const matchStatus = materialStatusFilter === "All" || m.status === materialStatusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const lowStockAlerts = materials.filter(m => m.status === "Low" || m.status === "Out");

  function getMaterialName(id: number) { return materials.find(m => m.id === id)?.name ?? "Unknown"; }
  function getMaterialUnit(id: number) { return materials.find(m => m.id === id)?.unit ?? ""; }

  function handleAddProduct() {
    if (!newProduct.name.trim()) return;
    const product: Product = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      stock: parseInt(newProduct.stock) || 0,
      price: parseInt(newProduct.price) || 0,
      status: newProduct.status,
      materialsUsed: [],
    };
    setProducts(prev => [...prev, product]);
    setNewProduct({ name: "", category: "Dining", stock: "", price: "", status: "In Stock" });
    setShowAddProduct(false);
  }

  function handleEditProduct() {
    if (!selectedProduct) return;
    setProducts(prev => prev.map(p => p.id === selectedProduct.id ? selectedProduct : p));
    setShowEditProduct(false);
    setSelectedProduct(null);
  }

  function handleAddMaterial() {
    if (!newMaterial.name.trim()) return;
    const material: RawMaterial = {
      id: Date.now(),
      name: newMaterial.name,
      category: newMaterial.category,
      stock: parseInt(newMaterial.stock) || 0,
      unit: newMaterial.unit,
      reorderPoint: parseInt(newMaterial.reorderPoint) || 0,
      status: newMaterial.status,
    };
    setMaterials(prev => [...prev, material]);
    setNewMaterial({ name: "", category: "Wood", stock: "", unit: "board feet", reorderPoint: "", status: "Available" });
    setShowAddMaterial(false);
  }

  function handleEditMaterial() {
    if (!selectedMaterial) return;
    setMaterials(prev => prev.map(m => m.id === selectedMaterial.id ? selectedMaterial : m));
    setShowEditMaterial(false);
    setSelectedMaterial(null);
  }

  function handleDeleteProduct(id: number) { setProducts(prev => prev.filter(p => p.id !== id)); }
  function handleDeleteMaterial(id: number) { setMaterials(prev => prev.filter(m => m.id !== id)); }
  function handleArchiveProduct(id: number) { setProducts(prev => prev.filter(p => p.id !== id)); }
  function handleArchiveMaterial(id: number) { setMaterials(prev => prev.filter(m => m.id !== id)); }

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Inventory</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{products.length} products · {materials.length} materials</p>
        </div>
        <Button onClick={() => activeTab === "products" ? setShowAddProduct(true) : setShowAddMaterial(true)}>
          <Plus size={15} className="mr-1" />
          {activeTab === "products" ? "Add Product" : "Add Material"}
        </Button>
      </div>

      {/* Low Stock Alert Banner */}
      {lowStockAlerts.length > 0 && (
        <div className="flex items-start gap-3 px-4 py-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <AlertTriangle size={15} className="text-yellow-500 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400">{lowStockAlerts.length} material{lowStockAlerts.length > 1 ? "s" : ""} need attention</p>
            <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-0.5 truncate">{lowStockAlerts.map(m => m.name).join(", ")}</p>
          </div>
          <button onClick={() => { setActiveTab("materials"); setMaterialStatusFilter("All"); }} className="text-xs text-yellow-700 dark:text-yellow-400 underline shrink-0 hover:opacity-80">View all</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border-b">
        <button onClick={() => setActiveTab("products")} className={`flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-widest font-medium border-b-2 transition-colors -mb-px ${activeTab === "products" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
          <Package size={13} />
          Products
          <span className="ml-1 px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px]">{products.length}</span>
        </button>
        <button onClick={() => setActiveTab("materials")} className={`flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-widest font-medium border-b-2 transition-colors -mb-px ${activeTab === "materials" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
          <TreePine size={13} />
          Raw Materials
          {lowStockAlerts.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-[10px]">{lowStockAlerts.length}</span>
          )}
        </button>
      </div>

      {/* ── PRODUCTS TAB ── */}
      {activeTab === "products" && (
        <>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8" />
            </div>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="text-sm border bg-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground">
              {productCategories.map((c) => (<option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>))}
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StockStatus | "All")} className="text-sm border bg-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground">
              <option value="All">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <div className="border bg-card rounded-lg overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground text-xs bg-muted/40">
                    <th className="text-left px-4 py-3 font-medium">Product Name</th>
                    <th className="text-left px-4 py-3 font-medium">Category</th>
                    <th className="text-left px-4 py-3 font-medium">Stock</th>
                    <th className="text-left px-4 py-3 font-medium">Price</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-right px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                    <React.Fragment key={product.id}>
                      <tr
                        className="hover:bg-muted/40 transition-colors cursor-pointer"
                        onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                      >
                        <td className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-2">
                            <Layers size={13} className="text-muted-foreground shrink-0" />
                            {product.name}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{product.category}</td>
                        <td className="px-4 py-3 text-muted-foreground">{product.stock} units</td>
                        <td className="px-4 py-3 font-medium">₱{product.price.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${stockStatusStyles[product.status]}`}>{product.status}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                            <button title="Edit" onClick={() => { setSelectedProduct({ ...product }); setShowEditProduct(true); }} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><Pencil size={15} /></button>
                            <button title="Archive" onClick={() => handleArchiveProduct(product.id)} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><Archive size={15} /></button>
                            <button title="Delete" onClick={() => handleDeleteProduct(product.id)} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-muted-foreground hover:text-red-500"><Trash2 size={15} /></button>
                          </div>
                        </td>
                      </tr>

                      {expandedProduct === product.id && (
                        <tr key={`${product.id}-materials`} className="bg-muted/20">
                          <td colSpan={6} className="px-6 py-3">
                            <div className="flex items-center gap-2 mb-2">
                              <TreePine size={12} className="text-muted-foreground" />
                              <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">Materials Used</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {product.materialsUsed.length > 0 ? product.materialsUsed.map(({ materialId, quantity }) => {
                                const mat = materials.find(m => m.id === materialId);
                                const isLow = mat?.status === "Low" || mat?.status === "Out";
                                return (
                                  <div key={materialId} className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border ${isLow ? "border-yellow-300 bg-yellow-50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-400" : "border-border bg-background text-muted-foreground"}`}>
                                    {isLow && <AlertTriangle size={10} />}
                                    <span>{getMaterialName(materialId)}</span>
                                    <span className="opacity-50">·</span>
                                    <span>{quantity} {getMaterialUnit(materialId)}</span>
                                  </div>
                                );
                              }) : (
                                <p className="text-xs text-muted-foreground italic">No materials linked yet.</p>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )) : (
                    <tr key="no-products">
                      <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground text-xs">
                        No products found.
                      </td>
                  </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="border-t px-4 py-3 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Showing {filteredProducts.length} of {products.length} products</p>
              <div className="flex items-center gap-1">
                <button className="text-xs px-2.5 py-1 border rounded-md text-muted-foreground hover:bg-muted transition-colors">Previous</button>
                <button className="text-xs px-2.5 py-1 border rounded-md bg-primary text-primary-foreground">1</button>
                <button className="text-xs px-2.5 py-1 border rounded-md text-muted-foreground hover:bg-muted transition-colors">Next</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── MATERIALS TAB ── */}
      {activeTab === "materials" && (
        <>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search materials..." value={materialSearch} onChange={(e) => setMaterialSearch(e.target.value)} className="pl-8" />
            </div>
            <select value={materialCategoryFilter} onChange={(e) => setMaterialCategoryFilter(e.target.value as MaterialCategory | "All")} className="text-sm border bg-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground">
              {materialCategoryOptions.map((c) => (<option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>))}
            </select>
            <select value={materialStatusFilter} onChange={(e) => setMaterialStatusFilter(e.target.value as MaterialStatus | "All")} className="text-sm border bg-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground">
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Low">Low</option>
              <option value="Out">Out</option>
            </select>
          </div>

          <div className="border bg-card rounded-lg overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground text-xs bg-muted/40">
                    <th className="text-left px-4 py-3 font-medium">Material Name</th>
                    <th className="text-left px-4 py-3 font-medium">Category</th>
                    <th className="text-left px-4 py-3 font-medium">Stock</th>
                    <th className="text-left px-4 py-3 font-medium">Unit</th>
                    <th className="text-left px-4 py-3 font-medium">Reorder Point</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-right px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredMaterials.length > 0 ? filteredMaterials.map((mat) => (
                    <tr key={mat.id} className="hover:bg-muted/40 transition-colors">
                      <td className="px-4 py-3 font-medium">{mat.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{mat.category}</td>
                      <td className="px-4 py-3">
                        <span className={mat.stock <= mat.reorderPoint ? "text-yellow-600 dark:text-yellow-400 font-medium" : "text-muted-foreground"}>{mat.stock}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{mat.unit}</td>
                      <td className="px-4 py-3 text-muted-foreground">{mat.reorderPoint} {mat.unit}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${materialStatusStyles[mat.status]}`}>{mat.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button title="Edit" onClick={() => { setSelectedMaterial({ ...mat }); setShowEditMaterial(true); }} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><Pencil size={15} /></button>
                          <button title="Archive" onClick={() => handleArchiveMaterial(mat.id)} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><Archive size={15} /></button>
                          <button title="Delete" onClick={() => handleDeleteMaterial(mat.id)} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-muted-foreground hover:text-red-500"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground text-xs">No materials found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="border-t px-4 py-3 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Showing {filteredMaterials.length} of {materials.length} materials</p>
              <div className="flex items-center gap-1">
                <button className="text-xs px-2.5 py-1 border rounded-md text-muted-foreground hover:bg-muted transition-colors">Previous</button>
                <button className="text-xs px-2.5 py-1 border rounded-md bg-primary text-primary-foreground">1</button>
                <button className="text-xs px-2.5 py-1 border rounded-md text-muted-foreground hover:bg-muted transition-colors">Next</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── ADD PRODUCT MODAL ── */}
      {showAddProduct && (
        <Modal title="Add New Product" onClose={() => setShowAddProduct(false)}>
          <div className="space-y-4">
            <FormField label="Product Name">
              <Input value={newProduct.name} onChange={(e) => setNewProduct(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Narra Dining Table" className="h-10" />
            </FormField>
            <FormField label="Category">
              <SelectInput value={newProduct.category} onChange={(v) => setNewProduct(p => ({ ...p, category: v }))}>
                {["Dining", "Living Room", "Bedroom", "Office"].map(c => <option key={c} value={c}>{c}</option>)}
              </SelectInput>
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Stock (units)">
                <Input type="number" value={newProduct.stock} onChange={(e) => setNewProduct(p => ({ ...p, stock: e.target.value }))} placeholder="0" className="h-10" />
              </FormField>
              <FormField label="Price (₱)">
                <Input type="number" value={newProduct.price} onChange={(e) => setNewProduct(p => ({ ...p, price: e.target.value }))} placeholder="0" className="h-10" />
              </FormField>
            </div>
            <FormField label="Status">
              <SelectInput value={newProduct.status} onChange={(v) => setNewProduct(p => ({ ...p, status: v as StockStatus }))}>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </SelectInput>
            </FormField>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1 h-10 text-xs uppercase tracking-widest" onClick={() => setShowAddProduct(false)}>Cancel</Button>
              <Button className="flex-1 h-10 text-xs uppercase tracking-widest" onClick={handleAddProduct}>Add Product</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── EDIT PRODUCT MODAL ── */}
      {showEditProduct && selectedProduct && (
        <Modal title="Edit Product" onClose={() => { setShowEditProduct(false); setSelectedProduct(null); }}>
          <div className="space-y-4">
            <FormField label="Product Name">
              <Input value={selectedProduct.name} onChange={(e) => setSelectedProduct(p => p ? ({ ...p, name: e.target.value }) : p)} className="h-10" />
            </FormField>
            <FormField label="Category">
              <SelectInput value={selectedProduct.category} onChange={(v) => setSelectedProduct(p => p ? ({ ...p, category: v }) : p)}>
                {["Dining", "Living Room", "Bedroom", "Office"].map(c => <option key={c} value={c}>{c}</option>)}
              </SelectInput>
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Stock (units)">
                <Input type="number" value={selectedProduct.stock} onChange={(e) => setSelectedProduct(p => p ? ({ ...p, stock: parseInt(e.target.value) || 0 }) : p)} className="h-10" />
              </FormField>
              <FormField label="Price (₱)">
                <Input type="number" value={selectedProduct.price} onChange={(e) => setSelectedProduct(p => p ? ({ ...p, price: parseInt(e.target.value) || 0 }) : p)} className="h-10" />
              </FormField>
            </div>
            <FormField label="Status">
              <SelectInput value={selectedProduct.status} onChange={(v) => setSelectedProduct(p => p ? ({ ...p, status: v as StockStatus }) : p)}>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </SelectInput>
            </FormField>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1 h-10 text-xs uppercase tracking-widest" onClick={() => { setShowEditProduct(false); setSelectedProduct(null); }}>Cancel</Button>
              <Button className="flex-1 h-10 text-xs uppercase tracking-widest" onClick={handleEditProduct}>Save Changes</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── ADD MATERIAL MODAL ── */}
      {showAddMaterial && (
        <Modal title="Add New Material" onClose={() => setShowAddMaterial(false)}>
          <div className="space-y-4">
            <FormField label="Material Name">
              <Input value={newMaterial.name} onChange={(e) => setNewMaterial(m => ({ ...m, name: e.target.value }))} placeholder="e.g. Narra Lumber" className="h-10" />
            </FormField>
            <FormField label="Category">
              <SelectInput value={newMaterial.category} onChange={(v) => setNewMaterial(m => ({ ...m, category: v as MaterialCategory }))}>
                {["Wood", "Fabric & Upholstery", "Metal", "Glass", "Finishing", "Hardware"].map(c => <option key={c} value={c}>{c}</option>)}
              </SelectInput>
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Stock">
                <Input type="number" value={newMaterial.stock} onChange={(e) => setNewMaterial(m => ({ ...m, stock: e.target.value }))} placeholder="0" className="h-10" />
              </FormField>
              <FormField label="Unit">
                <SelectInput value={newMaterial.unit} onChange={(v) => setNewMaterial(m => ({ ...m, unit: v as MaterialUnit }))}>
                  {materialUnits.map(u => <option key={u} value={u}>{u}</option>)}
                </SelectInput>
              </FormField>
            </div>
            <FormField label="Reorder Point">
              <Input type="number" value={newMaterial.reorderPoint} onChange={(e) => setNewMaterial(m => ({ ...m, reorderPoint: e.target.value }))} placeholder="e.g. 20" className="h-10" />
            </FormField>
            <FormField label="Status">
              <SelectInput value={newMaterial.status} onChange={(v) => setNewMaterial(m => ({ ...m, status: v as MaterialStatus }))}>
                <option value="Available">Available</option>
                <option value="Low">Low</option>
                <option value="Out">Out</option>
              </SelectInput>
            </FormField>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1 h-10 text-xs uppercase tracking-widest" onClick={() => setShowAddMaterial(false)}>Cancel</Button>
              <Button className="flex-1 h-10 text-xs uppercase tracking-widest" onClick={handleAddMaterial}>Add Material</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── EDIT MATERIAL MODAL ── */}
      {showEditMaterial && selectedMaterial && (
        <Modal title="Edit Material" onClose={() => { setShowEditMaterial(false); setSelectedMaterial(null); }}>
          <div className="space-y-4">
            <FormField label="Material Name">
              <Input value={selectedMaterial.name} onChange={(e) => setSelectedMaterial(m => m ? ({ ...m, name: e.target.value }) : m)} className="h-10" />
            </FormField>
            <FormField label="Category">
              <SelectInput value={selectedMaterial.category} onChange={(v) => setSelectedMaterial(m => m ? ({ ...m, category: v as MaterialCategory }) : m)}>
                {["Wood", "Fabric & Upholstery", "Metal", "Glass", "Finishing", "Hardware"].map(c => <option key={c} value={c}>{c}</option>)}
              </SelectInput>
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Stock">
                <Input type="number" value={selectedMaterial.stock} onChange={(e) => setSelectedMaterial(m => m ? ({ ...m, stock: parseInt(e.target.value) || 0 }) : m)} className="h-10" />
              </FormField>
              <FormField label="Unit">
                <SelectInput value={selectedMaterial.unit} onChange={(v) => setSelectedMaterial(m => m ? ({ ...m, unit: v as MaterialUnit }) : m)}>
                  {materialUnits.map(u => <option key={u} value={u}>{u}</option>)}
                </SelectInput>
              </FormField>
            </div>
            <FormField label="Reorder Point">
              <Input type="number" value={selectedMaterial.reorderPoint} onChange={(e) => setSelectedMaterial(m => m ? ({ ...m, reorderPoint: parseInt(e.target.value) || 0 }) : m)} className="h-10" />
            </FormField>
            <FormField label="Status">
              <SelectInput value={selectedMaterial.status} onChange={(v) => setSelectedMaterial(m => m ? ({ ...m, status: v as MaterialStatus }) : m)}>
                <option value="Available">Available</option>
                <option value="Low">Low</option>
                <option value="Out">Out</option>
              </SelectInput>
            </FormField>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1 h-10 text-xs uppercase tracking-widest" onClick={() => { setShowEditMaterial(false); setSelectedMaterial(null); }}>Cancel</Button>
              <Button className="flex-1 h-10 text-xs uppercase tracking-widest" onClick={handleEditMaterial}>Save Changes</Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}