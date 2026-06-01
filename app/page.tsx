"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategorySlider from "@/components/CategorySlider";
import ProductGrid from "@/components/ProductGrid";
import SectionTitle from "@/components/SectionTitle";
import CartButton from "@/components/CartButton";
import CartDrawer from "@/components/CartDrawer";
import { ShieldCheck, Truck, Utensils } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Cabecera Premium Sticky */}
      <Header />

      {/* Sección Hero con Carrusel de Recomendados */}
      <HeroSection />

      {/* Cuerpo de Contenido Principal */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-24">
        
        {/* Sección de Menú de Comidas */}
        <section className="space-y-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <SectionTitle
              badge="Frescura al Instante"
              title="Explora Nuestro Menú Gourmet"
              subtitle="Cada bocado es preparado al instante usando ingredientes locales frescos y de la más alta calidad."
            />
          </div>

          {/* Slider de Categorías con Scroll Horizontal */}
          <CategorySlider
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* Grilla Filtable e Interactiva con Buscador */}
          <ProductGrid activeCategory={activeCategory} />
        </section>

        {/* Sección de Propuesta de Valor y Características */}
        <section className="py-8 border-t border-neutral-200/50 dark:border-neutral-800/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Característica 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm space-y-4"
            >
              <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-2xl flex items-center justify-center">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Calidad 100% Artesanal</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Molemos nuestra carne premium Angus a diario. Usamos quesos reales fundidos y panes brioche horneados cada mañana.
              </p>
            </motion.div>

            {/* Característica 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm space-y-4"
            >
              <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-2xl flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Envío Súper Rápido</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Gracias a nuestro modelo de cocinas de despacho local, garantizamos que tus hamburguesas y papas rústicas lleguen calientes en tiempo récord.
              </p>
            </motion.div>

            {/* Característica 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm space-y-4"
            >
              <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Seguridad e Inocuidad</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Toda nuestra comida se prepara bajo rigurosos protocolos de bioseguridad e higiene, y se sella en empaques térmicos ecológicos.
              </p>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Footer Minimalista Premium */}
      <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800 py-12 mt-12 text-sm text-neutral-500 dark:text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-neutral-100 dark:border-neutral-850 pb-8">
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
              <span className="font-extrabold text-lg text-neutral-850 dark:text-white tracking-tight">
                BITE<span className="text-orange-500">BOX</span>
              </span>
              <p className="text-xs text-neutral-400">Creamos las mejores experiencias de comida rápida gourmet del país.</p>
            </div>
            
            <div className="flex gap-6 font-semibold">
              <a href="#menu" className="hover:text-orange-500 transition-colors">Menú</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Políticas de Privacidad</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Términos de Servicio</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Contacto</a>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-neutral-400">
            <span>© 2026 BITEBOX Inc. Todos los derechos reservados.</span>
            <div className="flex gap-4">
              <span>Creado con ❤️ por Antigravity Design</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Botón Flotante del Carrito */}
      <CartButton />

      {/* Panel Desplizable del Pedido (Cart Drawer) */}
      <CartDrawer />
    </div>
  );
}
