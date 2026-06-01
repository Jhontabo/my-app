"use client";

import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect } from "react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
    totalItems,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, setIsCartOpen]);

  // Helper to format currency to Colombian COP
  const formatCOP = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white dark:bg-neutral-900 shadow-2xl flex flex-col h-full border-l border-neutral-100 dark:border-neutral-800"
          >
            {/* Header */}
            <div className="p-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Tu Pedido</h2>
                <span className="bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 text-xs px-2 py-0.5 rounded-full font-semibold">
                  {totalItems} {totalItems === 1 ? "producto" : "productos"}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-400 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <AnimatePresence initial={false}>
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center p-6"
                  >
                    <div className="w-20 h-20 bg-orange-50 dark:bg-orange-950/20 rounded-full flex items-center justify-center mb-4 text-orange-500 text-3xl">
                      🍔
                    </div>
                    <h3 className="font-bold text-neutral-850 dark:text-white text-lg">Tu carrito está vacío</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1 max-w-xs">
                      ¡Explora nuestro menú y añade tus antojos favoritos hoy!
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-orange-500/20 transition-all text-sm cursor-pointer"
                    >
                      Empezar a Ordenar
                    </button>
                  </motion.div>
                ) : (
                  cart.map(({ item, quantity }) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex items-center gap-4 bg-neutral-50 dark:bg-neutral-800/40 p-3 rounded-2xl border border-neutral-100/50 dark:border-neutral-800/20"
                    >
                      {/* Image */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-neutral-850 dark:text-neutral-200 truncate">
                          {item.title}
                        </h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-sm text-orange-600 dark:text-orange-400">
                            {formatCOP(item.price * quantity)}
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2.5 bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 px-2 py-1 rounded-full shadow-sm">
                            <button
                              onClick={() => updateQuantity(item.id, quantity - 1)}
                              className="p-0.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center text-neutral-850 dark:text-neutral-200">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, quantity + 1)}
                              className="p-0.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-neutral-500 dark:text-neutral-400">
                    <span>Subtotal</span>
                    <span>{formatCOP(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-500 dark:text-neutral-400">
                    <span>Costo de Envío</span>
                    <span className="text-green-600 font-medium">GRATIS</span>
                  </div>
                  <div className="border-t border-neutral-200/60 dark:border-neutral-800 my-2 pt-2 flex justify-between font-bold text-base text-neutral-900 dark:text-white">
                    <span>Total Estimado</span>
                    <span className="text-orange-600 dark:text-orange-400">
                      {formatCOP(totalPrice)}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-orange-500/25 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => alert(`🎉 ¡Muchas gracias por tu pedido!\nValor Total: ${formatCOP(totalPrice)}\n(Simulación de compra completada con éxito)`)}
                >
                  Confirmar Pedido • {formatCOP(totalPrice)}
                </motion.button>
                <p className="text-[10px] text-center text-neutral-400 dark:text-neutral-500">
                  Al confirmar tu pedido aceptas nuestros Términos de Servicio.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
