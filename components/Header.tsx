"use client";

import { Flame, Moon, Sun, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isDark =
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { href: "/#menu", label: "Menú" },
    { href: "/admin", label: "Administrar" },
    { href: "#about", label: "Nosotros" },
    { href: "#reviews", label: "Reseñas" },
    { href: "#contact", label: "Contacto" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md shadow-md border-b border-neutral-100 dark:border-neutral-800"
          : "bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
              BITE<span className="text-orange-500">BOX</span>
            </span>
            <span className="text-[10px] text-neutral-400 font-medium tracking-widest uppercase -mt-0.5">
              Comida Rápida Gourmet
            </span>
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-600 dark:text-neutral-300">
          <Link href="/#menu" className="hover:text-orange-500 transition-colors">
            Menú
          </Link>
          <Link href="/admin" className="hover:text-orange-500 transition-colors">
            Administrar
          </Link>
          <a href="#about" className="hover:text-orange-500 transition-colors">
            Nosotros
          </a>
          <a href="#reviews" className="hover:text-orange-500 transition-colors">
            Reseñas
          </a>
          <a href="#contact" className="hover:text-orange-500 transition-colors">
            Contacto
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-3 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white dark:bg-neutral-900 z-50 shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
                <span className="font-extrabold text-lg tracking-tight text-neutral-900 dark:text-white">
                  BITE<span className="text-orange-500">BOX</span>
                </span>
                <button
                  onClick={closeMenu}
                  className="p-3 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                </button>
              </div>

              <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="block px-5 py-4 rounded-xl text-base font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-orange-500 transition-colors min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="p-5 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { toggleDarkMode(); closeMenu(); }}
                    className="flex-1 p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-sm font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer min-h-[44px]"
                  >
                    {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
