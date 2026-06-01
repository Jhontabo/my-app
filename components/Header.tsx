"use client";

import { Flame, Moon, Sun, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Initialize theme from localStorage/system preference
  useEffect(() => {
    const isDark =
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Monitor scroll for header background styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md shadow-md border-b border-neutral-100 dark:border-neutral-800"
          : "bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
            <Flame className="w-5.5 h-5.5 animate-pulse" />
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

        {/* Center Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-600 dark:text-neutral-300">
          <a href="/#menu" className="hover:text-orange-500 transition-colors">
            Menú
          </a>
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

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-all cursor-pointer"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>



          {/* Mobile Menu Icon */}
          <button
            className="md:hidden p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 cursor-pointer"
            aria-label="Menu"
          >
            <Menu className="w-5.5 h-5.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
