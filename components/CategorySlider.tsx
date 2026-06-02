"use client";

import { CATEGORIES } from "@/data/foodData";
import { motion } from "framer-motion";

interface CategorySliderProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function CategorySlider({
  activeCategory,
  setActiveCategory,
}: CategorySliderProps) {
  return (
    <>
      <div className="sm:hidden w-full">
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-sm font-semibold text-neutral-100 focus:outline-none focus:border-orange-500 transition-colors min-h-[44px] appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: "right 0.75rem center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "1.25rem",
          }}
        >
          {CATEGORIES.map((category) => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden sm:flex w-full py-4 -mx-4 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory touch-pan-x items-center justify-center">
        <div className="flex gap-2.5 sm:gap-3.5 pb-2">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className="relative px-5 py-3 rounded-full flex items-center gap-2 text-sm font-semibold select-none cursor-pointer focus:outline-none transition-colors duration-200 snap-start shrink-0"
                style={{
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg shadow-orange-500/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <span
                  className={`relative z-10 text-base transition-transform duration-200 ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                >
                  {category.icon}
                </span>
                <span
                  className={`relative z-10 tracking-tight transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
