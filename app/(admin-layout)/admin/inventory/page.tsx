"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Archive, Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";

type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: StockStatus;
}

const initialProducts: Product[] = [
  { id: 1, name: "Mahogany Dining Table", category: "Dining", stock: 12, price: 18500, status: "In Stock" },
  { id: 2, name: "L-Shape Sofa", category: "Living Room", stock: 3, price: 24000, status: "Low Stock" },
  { id: 3, name: "Queen Bed Frame", category: "Bedroom", stock: 0, price: 12000, status: "Out of Stock" },
  { id: 4, name: "Office Chair", category: "Office", stock: 24, price: 4500, status: "In Stock" },
  { id: 5, name: "Wooden Bookshelf", category: "Living Room", stock: 2, price: 6800, status: "Low Stock" },
  { id: 6, name: "Coffee Table", category: "Living Room", stock: 8, price: 7200, status: "In Stock" },
  { id: 7, name: "Wardrobe Cabinet", category: "Bedroom", stock: 0, price: 15000, status: "Out of Stock" },
  { id: 8, name: "Study Desk", category: "Office", stock: 6, price: 5500, status: "In Stock" },
];

const statusStyles: Record<StockStatus, string> = {
  "In Stock": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "Low Stock": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  "Out of Stock": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const categories = ["All", "Dining", "Living Room", "Bedroom", "Office"];

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<StockStatus | "All">("All");

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "All" || p.category === categoryFilter;
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  function handleDelete(id: number) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function handleArchive(id: number) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Inventory</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{products.length} products total</p>
        </div>
        <Button>
          <Plus size={15} />
          Add Product
        </Button>

      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="text-sm border bg-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StockStatus | "All")}
          className="text-sm border bg-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground"
        >
          <option value="All">All Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      {/* Table */}
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
              {filtered.length > 0 ? (
                filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{product.category}</td>
                    <td className="px-4 py-3 text-muted-foreground">{product.stock} units</td>
                    <td className="px-4 py-3 font-medium">₱{product.price.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[product.status]}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          title="View Details"
                          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          title="Edit"
                          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          title="Archive"
                          onClick={() => handleArchive(product.id)}
                          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <Archive size={15} />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => handleDelete(product.id)}
                          className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-muted-foreground hover:text-red-500"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground text-xs">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="border-t px-4 py-3 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {products.length} products
          </p>
          <div className="flex items-center gap-1">
            <button className="text-xs px-2.5 py-1 border rounded-md text-muted-foreground hover:bg-muted transition-colors">
              Previous
            </button>
            <button className="text-xs px-2.5 py-1 border rounded-md bg-primary text-primary-foreground">
              1
            </button>
            <button className="text-xs px-2.5 py-1 border rounded-md text-muted-foreground hover:bg-muted transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}