"use client";

import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import SectionTitle from "@/components/SectionTitle";

export default function Home() {

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

          {/* Grilla con todas las categorías */}
          <ProductGrid />
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
    </div>
  );
}
