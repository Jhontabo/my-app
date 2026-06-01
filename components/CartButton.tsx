"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartButton() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          onClick={() => setIsCartOpen(true)}
          initial={{ scale: 0, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0, y: 50, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-2xl hover:shadow-orange-500/30 transition-shadow duration-300 md:bottom-8 md:right-8 group cursor-pointer"
          aria-label="Open Cart"
        >
          <ShoppingBag className="w-6 h-6 transition-transform group-hover:rotate-12" />
          
          <motion.span
            key={totalItems} // Triggers animation on change
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="absolute -top-1 -right-1 flex items-center justify-center min-w-6 h-6 px-1.5 text-xs font-bold bg-white text-orange-600 rounded-full border-2 border-orange-500 shadow-md"
          >
            {totalItems}
          </motion.span>

          {/* Ripple effect */}
          <span className="absolute inset-0 rounded-full bg-orange-400 opacity-0 group-hover:animate-ping -z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
