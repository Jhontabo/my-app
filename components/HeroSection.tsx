"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { FOOD_ITEMS, FoodItem } from "@/data/foodData";
import { ArrowRight, Star, Clock, Flame, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  const { addToCart } = useCart();
  
  // Filter featured items for the recommended carousel
  const featuredItems = FOOD_ITEMS.filter((item) => item.isFeatured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide effect
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  const currentItem = featuredItems[currentIndex];

  // Variants for slide transition
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 25 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 25 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  };

  // Helper to format currency to Colombian COP
  const formatCOP = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50/60 via-amber-50/40 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 pb-16 pt-8 sm:pb-24 sm:pt-12 md:pb-32 lg:pt-16 rounded-b-[2.5rem] md:rounded-b-[4rem] border-b border-neutral-100 dark:border-neutral-800/40">
      
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 dark:bg-orange-950/10 rounded-full filter blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-100/20 dark:bg-red-950/10 rounded-full filter blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 md:space-y-8">
            
            {/* Colombian Promo Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-100/80 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 text-xs font-bold border border-orange-200/50 dark:border-orange-900/30 shadow-sm"
            >
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>🔥 20% DTO EN TU PRIMER PEDIDO CON EL CÓDIGO: BITE20</span>
            </motion.div>

            {/* Colombian Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.1]"
            >
              Lo Mejor de la <br className="hidden sm:inline" />
              Ciudad, <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Recomendado</span> <br />
              para ti.
            </motion.h1>

            {/* Colombian Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium"
            >
              Ingredientes frescos seleccionados a mano, carne 100% Angus madurada, y toques gourmet locales. Descubre las opciones favoritas de nuestra comunidad.
            </motion.p>

            {/* Colombian CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#menu"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-orange-500/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Pedir Ahora</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#menu"
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white font-bold rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ver Todo el Menú</span>
              </a>
            </motion.div>

            {/* Colombian Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-4 border-t border-neutral-200/50 dark:border-neutral-800/40 w-full max-w-md sm:max-w-none text-left"
            >
              <div className="flex flex-col">
                <span className="text-2xl font-black text-neutral-900 dark:text-white">12 min</span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-orange-500" /> Entrega Promedio
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-neutral-900 dark:text-white">4.9★</span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 text-orange-500 fill-orange-500" /> Calificación
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-neutral-900 dark:text-white">100%</span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                  🌿 Frescura Real
                </span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Premium Interactive Carousel for Recommended Foods */}
          <div 
            className="lg:col-span-6 flex flex-col items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center">
              
              {/* Visual glow background backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-400/20 to-red-400/20 dark:from-orange-500/10 dark:to-red-500/10 rounded-full filter blur-3xl opacity-60 scale-75 animate-pulse" />

              {/* Slider Panel with AnimatePresence */}
              <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] border border-neutral-100 dark:border-neutral-800 shadow-2xl bg-white dark:bg-neutral-900 flex flex-col justify-between">
                
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentItem.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 flex flex-col justify-between h-full"
                  >
                    {/* Food Image */}
                    <div className="relative w-full h-[58%] overflow-hidden bg-neutral-100">
                      <Image
                        src={currentItem.image}
                        alt={currentItem.title}
                        fill
                        priority
                        sizes="(max-w-640px) 100vw, 480px"
                        className="object-cover"
                      />
                      {/* Image Top Overlay Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Star className="w-3 h-3 fill-white text-white" />
                          <span>Recomendado</span>
                        </span>
                        <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                          {currentItem.calories} kcal
                        </span>
                      </div>
                    </div>

                    {/* Food Content details */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white dark:bg-neutral-900">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 font-semibold">
                          <span className="flex items-center gap-1 text-orange-500 bg-orange-50 dark:bg-orange-950/20 px-2 py-0.5 rounded-full">
                            ★ {currentItem.rating.toFixed(1)}
                          </span>
                          <span className="flex items-center gap-1 bg-neutral-50 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
                            ⏱️ {currentItem.prepTime}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-neutral-900 dark:text-white text-lg tracking-tight line-clamp-1">
                          {currentItem.title}
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed font-normal">
                          {currentItem.description}
                        </p>
                      </div>

                      {/* Add to Cart Directly from Carousel */}
                      <div className="flex items-center justify-between pt-3 border-t border-neutral-100/50 dark:border-neutral-800/40">
                        <span className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
                          {formatCOP(currentItem.price)}
                        </span>
                        <motion.button
                          onClick={() => addToCart(currentItem)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-orange-500/20 cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Agregar</span>
                        </motion.button>
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Left/Right Action Arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-[29%] -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 dark:bg-neutral-800/90 text-neutral-850 dark:text-white flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-neutral-750 transition-colors z-20 cursor-pointer"
                  aria-label="Anterior comida"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-[29%] -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 dark:bg-neutral-800/90 text-neutral-850 dark:text-white flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-neutral-750 transition-colors z-20 cursor-pointer"
                  aria-label="Siguiente comida"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

              </div>
            </div>

            {/* Slider Dots/Indicators */}
            <div className="flex gap-2 mt-4 z-10">
              {featuredItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "w-6 bg-orange-500" : "w-2 bg-neutral-300 dark:bg-neutral-700"
                  }`}
                  aria-label={`Ir al slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
