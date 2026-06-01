"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart, Star, Clock, Flame } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50/60 via-amber-50/40 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 pb-16 pt-8 sm:pb-24 sm:pt-12 md:pb-32 lg:pt-16 rounded-b-[2.5rem] md:rounded-b-[4rem] border-b border-neutral-100 dark:border-neutral-800/40">
      
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 dark:bg-orange-950/10 rounded-full filter blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-100/20 dark:bg-red-950/10 rounded-full filter blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content Area */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 md:space-y-8">
            
            {/* Promo Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-100/80 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 text-xs font-bold border border-orange-200/50 dark:border-orange-900/30 shadow-sm"
            >
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>20% OFF YOUR FIRST ORDER WITH CODE: BITE20</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.1]"
            >
              The Best <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Burgers</span> <br className="hidden sm:inline" />
              In Town, Crafted Daily.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium"
            >
              Handcrafted smash patties, locally sourced fresh ingredients, signature home sauces, and fluffy toasted brioche buns. Savor the gourmet difference today.
            </motion.p>

            {/* CTAs */}
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
                <span>Order Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#menu"
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white font-bold rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Full Menu</span>
              </a>
            </motion.div>

            {/* Social Proof Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-4 border-t border-neutral-200/50 dark:border-neutral-800/40 w-full max-w-md sm:max-w-none text-left"
            >
              <div className="flex flex-col">
                <span className="text-2xl font-black text-neutral-900 dark:text-white">12m</span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-orange-500" /> Avg Delivery
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-neutral-900 dark:text-white">4.9★</span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 text-orange-500 fill-orange-500" /> 15k+ Reviews
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-neutral-900 dark:text-white">100%</span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                  🚀 Fresh Beef
                </span>
              </div>
            </motion.div>

          </div>

          {/* Featured Image Area */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Visual glow backdrop for food item */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-400/25 to-red-400/25 dark:from-orange-500/10 dark:to-red-500/10 rounded-full filter blur-2xl opacity-60 scale-75 animate-pulse" />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
              className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing"
              whileHover={{ scale: 1.03 }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.15}
            >
              {/* Main Gourmet Burger Showcase */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="relative w-full h-full drop-shadow-[0_25px_35px_rgba(249,115,22,0.35)] dark:drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80"
                  alt="Truffle Umami Smash Burger"
                  fill
                  priority
                  sizes="(max-w-640px) 280px, (max-w-768px) 384px, 420px"
                  className="object-cover rounded-[2.5rem] md:rounded-[4rem] border-4 border-white dark:border-neutral-800 shadow-2xl"
                />

                {/* Popular Floating Tag */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 bg-white dark:bg-neutral-800 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-1.5 border border-neutral-100 dark:border-neutral-700"
                >
                  <span className="text-xl">🔥</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Bestseller</span>
                    <span className="text-xs font-bold text-neutral-800 dark:text-white">Truffle Smash</span>
                  </div>
                </motion.div>

                {/* Preparation Time Tag */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                  className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 bg-white dark:bg-neutral-800 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-neutral-100 dark:border-neutral-700"
                >
                  <Clock className="w-4 h-4 text-orange-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Fast Prep</span>
                    <span className="text-xs font-bold text-neutral-800 dark:text-white">12 Mins</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
