"use client";

import { useMenu } from "@/context/MenuContext";
import { CATEGORIES, FoodItem } from "@/data/foodData";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, Flame } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function ProductGrid() {
  const { menu } = useMenu();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  const matchesSearch = (item: { title: string; description: string }) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase());

  const allItems = menu.filter(matchesSearch);

  const grouped = CATEGORIES.filter((c) => c.id !== "all").map((cat) => ({
    category: cat,
    items: allItems.filter((item) => item.category === cat.id),
  })).filter((g) => g.items.length > 0);

  const hasResults = grouped.length > 0;

  return (
    <div className="space-y-8" id="menu">
      
      {/* Search Input Bar */}
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

      {/* Category Sections */}
      <AnimatePresence mode="popLayout">
        {!hasResults ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 0.95 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-12 sm:py-20 text-center"
          >
            <span className="text-4xl mb-4">🔍</span>
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">No encontramos productos que coincidan</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-xs">
              ¡Intenta ajustando tu búsqueda!
            </p>
          </motion.div>
        ) : (
          <div className="space-y-16">
            {grouped.map(({ category, items }) => (
              <motion.section
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                id={`cat-${category.id}`}
              >
                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-neutral-200/60 dark:border-neutral-800">
                  <span className="text-3xl sm:text-4xl">{category.icon}</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
                    {category.name}
                  </h2>
                  <span className="text-sm font-semibold text-neutral-400 dark:text-neutral-500 ml-auto">
                    {items.length} {items.length === 1 ? "plato" : "platos"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.map((item) => (
                    <ProductCard key={item.id} item={item} onSelect={setSelectedItem} />
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Full-screen Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-neutral-900 md:inset-x-8 md:inset-y-6 md:max-w-2xl md:mx-auto md:rounded-3xl md:overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="relative w-full h-[45vh] md:h-80 flex-shrink-0 bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {selectedItem.isPopular && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Más Vendido</span>
                  </div>
                )}
                {/* Title inside image on mobile */}
                <div className="absolute bottom-4 left-4 right-4 md:hidden">
                  <h2 className="text-2xl font-black text-white drop-shadow-lg">
                    {selectedItem.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {/* Title (desktop) */}
                <div className="hidden md:block">
                  <h2 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                    {selectedItem.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Meta Row */}
                <div className="flex items-center gap-4 text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-full">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    {selectedItem.prepTime}
                  </span>
                </div>

                {/* Price */}
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Precio</span>
                  <p className="text-3xl font-black text-neutral-900 dark:text-white">
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                    }).format(selectedItem.price)}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

