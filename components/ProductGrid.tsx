"use client";

import { FoodItem, FOOD_ITEMS } from "@/data/foodData";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag } from "lucide-react";
import { useState } from "react";

interface ProductGridProps {
  activeCategory: string;
}

export default function ProductGrid({ activeCategory }: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter items based on active category AND search query
  const filteredItems = FOOD_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8" id="menu">
      
      {/* Search Input Bar (UX Boost) */}
      <div className="max-w-md mx-auto relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-500 group-focus-within:text-orange-500 transition-colors">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Buscar hamburguesas, pizzas, papas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-250/70 dark:border-neutral-800 rounded-2xl shadow-sm text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-500 transition-all font-medium"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-4 flex items-center text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Grid Layout Container */}
      <motion.div layout className="relative">
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <span className="text-4xl mb-4">🔍</span>
              <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">No encontramos productos que coincidan</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-xs">
                ¡Intenta ajustando tu búsqueda o seleccionando otra deliciosa categoría!
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
            >
              {filteredItems.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
