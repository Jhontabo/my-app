"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import CategorySlider from "@/components/CategorySlider";
import SectionTitle from "@/components/SectionTitle";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Cabecera Premium Sticky */}
      <Header />

      {/* Cuerpo de Contenido Principal */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-16 sm:pb-24 space-y-12 sm:space-y-16">
        
        {/* Sección de Menú de Comidas */}
        <section className="space-y-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <SectionTitle
              badge="Frescura al Instante"
              title="Explora Nuestro Menú Gourmet"
              subtitle="Cada bocado es preparado al instante usando ingredientes locales frescos y de la más alta calidad."
            />
          </div>

          {/* Filtro de categorías */}
          <CategorySlider
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* Grilla con todas las categorías */}
          <ProductGrid categoryFilter={activeCategory} />
        </section>

      </main>

      {/* Contacto */}
      <section id="contact" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20 scroll-mt-24">
        <SectionTitle
          badge="Estamos Aquí"
          title="Contáctanos"
          subtitle="Ubicados en el corazón de la ciudad, listos para servirte la mejor experiencia gourmet."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
          <div className="flex items-start gap-4 p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
            <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-xl flex-shrink-0">
              <MapPin className="w-5 h-5 text-orange-500" />
            </div>
            <div className="min-w-0">
              <h4 className="font-extrabold text-sm text-neutral-900 dark:text-white">Dirección</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">Cra 45 # 23-12<br />Bogotá, Colombia</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
            <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-xl flex-shrink-0">
              <Phone className="w-5 h-5 text-orange-500" />
            </div>
            <div className="min-w-0">
              <h4 className="font-extrabold text-sm text-neutral-900 dark:text-white">Teléfono</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">+57 310 123 4567</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
            <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-xl flex-shrink-0">
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <div className="min-w-0">
              <h4 className="font-extrabold text-sm text-neutral-900 dark:text-white">Horarios</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">Lun–Sáb: 12:00–22:00<br />Dom: 13:00–21:00</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
            <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-xl flex-shrink-0">
              <Mail className="w-5 h-5 text-orange-500" />
            </div>
            <div className="min-w-0">
              <h4 className="font-extrabold text-sm text-neutral-900 dark:text-white">Email</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 break-all">hola@bitebox.co</p>
            </div>
          </div>
        </div>
      </section>

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
    </div>
  );
}
