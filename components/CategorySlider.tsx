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
    <div className="w-full py-4 -mx-4 px-4 overflow-x-auto scrollbar-hide touch-pan-x flex items-center justify-start sm:justify-center">
      <div className="flex gap-2.5 sm:gap-3.5 pb-2">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="relative px-5 py-3 rounded-full flex items-center gap-2 text-sm font-semibold select-none cursor-pointer focus:outline-none transition-colors duration-200"
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {/* Active Slide-over background bubble */}
              {isActive && (
                <motion.span
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg shadow-orange-500/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon & Name */}
              <span
                className={`relative z-10 text-base transition-transform duration-200 ${
                  isActive ? "scale-110" : "scale-100 group-hover:scale-110"
                }`}
              >
                {category.icon}
              </span>
              <span
                className={`relative z-10 tracking-tight transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
