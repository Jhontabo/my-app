"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategorySlider from "@/components/CategorySlider";
import ProductGrid from "@/components/ProductGrid";
import SectionTitle from "@/components/SectionTitle";
import CartButton from "@/components/CartButton";
import CartDrawer from "@/components/CartDrawer";
import { ShieldCheck, Truck, Utensils, Star, Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Sticky Header */}
      <Header />

      {/* Hero Showcase Section */}
      <HeroSection />

      {/* Main Content Body */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-24">
        
        {/* Menu Section */}
        <section className="space-y-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <SectionTitle
              badge="Fresh & Fast"
              title="Explore Our Gourmet Menu"
              subtitle="Every single bite is made to order using premium, locally-sourced fresh ingredients."
            />
          </div>

          {/* Horizontally Scrollable Category Badges */}
          <CategorySlider
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* Filterable/Searchable Food Grid */}
          <ProductGrid activeCategory={activeCategory} />
        </section>

        {/* Brand Core Values Section (SaaS / Premium Upgrade) */}
        <section className="py-8 border-t border-neutral-200/50 dark:border-neutral-800/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm space-y-4"
            >
              <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-2xl flex items-center justify-center">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">100% Artisanal Quality</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                We grind our prime Angus beef daily. Our cheese is real, and our secret recipe brioche buns are baked fresh every morning.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm space-y-4"
            >
              <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-2xl flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Sub-15 Min Delivery</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                By leveraging localized micro-kitchen hubs, we guarantee your gourmet burgers and loaded fries arrive piping hot in record time.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm space-y-4"
            >
              <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Strict Food Safety</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                All gourmet meals are prepared in modern kitchen environments and sealed inside eco-friendly insulated boxes to ensure perfection.
              </p>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Premium Minimalist Footer */}
      <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800 py-12 mt-12 text-sm text-neutral-500 dark:text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-neutral-100 dark:border-neutral-850 pb-8">
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
              <span className="font-extrabold text-lg text-neutral-800 dark:text-white tracking-tight">
                BITE<span className="text-orange-500">BOX</span>
              </span>
              <p className="text-xs text-neutral-400">Handcrafting the best fast-food experiences in the country.</p>
            </div>
            
            <div className="flex gap-6 font-semibold">
              <a href="#menu" className="hover:text-orange-500 transition-colors">Menu</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-neutral-400">
            <span>© 2026 BITEBOX Inc. All rights reserved.</span>
            <div className="flex gap-4">
              <span>Made with ❤️ by Antigravity Design</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Cart Trigger */}
      <CartButton />

      {/* Slide-over Checkout Drawer */}
      <CartDrawer />
    </div>
  );
}
