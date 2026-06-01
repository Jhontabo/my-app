"use client";

import { FoodItem } from "@/data/foodData";
import { useCart } from "@/context/CartContext";
import { Plus, Star, Clock, Flame } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProductCardProps {
  item: FoodItem;
}

export default function ProductCard({ item }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col justify-between bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800/50 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      
      {/* Product Image and Overlay Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-850">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-w-640px) 100vw, (max-w-1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Backdrop Dark Vignette Overlay for Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Floating Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          {item.isPopular ? (
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Flame className="w-3 h-3 animate-bounce" />
              <span>Bestseller</span>
            </div>
          ) : (
            <div />
          )}

          {/* Calorie Indicator */}
          <div className="bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
            {item.calories} kcal
          </div>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Metadata: Ratings and Prep Time */}
          <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 font-semibold">
            <span className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              {item.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-1 bg-neutral-50 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              {item.prepTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-extrabold text-neutral-900 dark:text-white text-base sm:text-lg tracking-tight group-hover:text-orange-500 transition-colors duration-200 line-clamp-1">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Pricing and Action Button */}
        <div className="flex items-center justify-between mt-5 pt-3 border-t border-neutral-100/50 dark:border-neutral-800/40">
          <div className="flex flex-col">
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider">
              Price
            </span>
            <span className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
              ${item.price.toFixed(2)}
            </span>
          </div>

          {/* Interactive Floating Add to Cart Button */}
          <motion.button
            onClick={() => addToCart(item)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl shadow-md hover:shadow-orange-500/25 cursor-pointer"
            aria-label={`Add ${item.title} to cart`}
          >
            <Plus className="w-5 h-5 font-bold" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
