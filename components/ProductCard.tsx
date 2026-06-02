"use client";

import { FoodItem } from "@/data/foodData";
import { Clock, Flame } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProductCardProps {
  item: FoodItem;
  onSelect: (item: FoodItem) => void;
}

export default function ProductCard({ item, onSelect }: ProductCardProps) {

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
      whileHover={{ y: -6 }}
      onClick={() => onSelect(item)}
      className="group relative flex flex-col justify-between bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800/50 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
    >
      
      {/* Product Image and Overlay Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-850">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Backdrop Dark Vignette Overlay for Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Floating Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          {item.isPopular ? (
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
              <Flame className="w-3 h-3 animate-bounce" />
              <span>Más Vendido</span>
            </div>
          ) : (
            <div />
          )}


        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Prep Time */}
          <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 font-semibold">
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
            <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider">
              Precio
            </span>
            <span className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              }).format(item.price)}
            </span>
          </div>

          {/* Consumo Local Label */}
          <div className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 px-3 py-1.5 rounded-xl border border-orange-100/10">
            Servido al instante
          </div>
        </div>
      </div>
    </motion.div>
  );
}
