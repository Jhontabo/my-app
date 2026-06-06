"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMenu } from "@/context/MenuContext";
import { FoodItem, CATEGORIES } from "@/data/foodData";
import { Plus, Edit2, Trash2, ArrowLeft, RotateCcw, X, LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const foodFormSchema = z.object({
  title: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  image: z.string().url("Debe ser una URL válida").min(1, "La URL de la imagen es obligatoria"),
  category: z.string().min(1, "Selecciona una categoría"),
  price: z.number().min(1, "El precio debe ser mayor a 0"),
  prepTime: z.string().min(1, "El tiempo de preparación es obligatorio"),
  isPopular: z.boolean(),
});

type FoodFormData = z.infer<typeof foodFormSchema>;

const defaultFormValues: FoodFormData = {
  title: "",
  description: "",
  image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
  category: "burgers",
  price: 25000,
  prepTime: "10-12 min",
  isPopular: false,
};

export default function AdminPage() {
  const { menu, addFoodItem, updateFoodItem, deleteFoodItem, resetMenu } = useMenu();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FoodFormData>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: defaultFormValues,
  });

  const openAddModal = () => {
    reset(defaultFormValues);
    setIsAddModalOpen(true);
  };

  const openEditModal = (item: FoodItem) => {
    setEditingItem(item);
    reset({
      title: item.title,
      description: item.description,
      image: item.image,
      category: item.category,
      price: item.price,
      prepTime: item.prepTime,
      isPopular: !!item.isPopular,
    });
  };

  const onAddSubmit = (data: FoodFormData) => {
    addFoodItem(data);
    setIsAddModalOpen(false);
  };

  const onEditSubmit = (data: FoodFormData) => {
    if (!editingItem) return;
    updateFoodItem({ ...data, id: editingItem.id });
    setEditingItem(null);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el plato "${title}" del menú?`)) {
      deleteFoodItem(id);
    }
  };

  // Filter items
  const filteredItems = menu.filter((item) => {
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatCOP = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      
      {/* Header Panel */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-bold text-neutral-600 hover:text-orange-500 dark:text-neutral-400 dark:hover:text-orange-400 transition-colors bg-neutral-100 dark:bg-neutral-800 px-2.5 py-2 rounded-xl flex-shrink-0"
              title="Volver al menú"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ver Menú</span>
            </Link>
            <h1 className="text-base sm:text-xl font-black text-neutral-900 dark:text-white tracking-tight truncate">
              👑 Panel
            </h1>
          </div>
          
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={resetMenu}
              className="p-2.5 sm:px-3 sm:py-2.5 text-xs font-bold text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-red-500 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Restaurar menú base"
            >
              <RotateCcw className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Restaurar</span>
            </button>
            <form action={logout}>
              <button
                type="submit"
                className="p-2.5 sm:px-3 sm:py-2.5 text-xs font-bold text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-red-500 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </form>
            <button
              onClick={openAddModal}
              className="px-3 sm:px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all inline-flex items-center gap-1 cursor-pointer shadow-md min-h-[44px]"
            >
              <Plus className="w-4 h-4 sm:mr-0.5" />
              <span className="hidden sm:inline">Agregar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Statistics Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/50 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
            <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Total Platos</span>
            <span className="text-3xl font-black text-neutral-950 dark:text-white mt-2">{menu.length}</span>
          </div>
          <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/50 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
            <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Categorías Activas</span>
            <span className="text-3xl font-black text-neutral-950 dark:text-white mt-2">
              {CATEGORIES.filter(c => c.id !== "all").length}
            </span>
          </div>
          <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/50 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
            <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Platos Más Vendidos</span>
            <span className="text-3xl font-black text-neutral-950 dark:text-white mt-2">
              {menu.filter((item) => item.isPopular).length}
            </span>
          </div>
        </section>

        {/* Filter and Search Controls */}
        <section className="p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/50 dark:border-neutral-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative w-full md:max-w-xs group">
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-4 pr-10 py-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-500 transition-all min-h-[44px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-3 flex items-center text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Horizontal Category Filters */}
          <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-4 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer min-h-[44px] ${
                  categoryFilter === cat.id
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/10"
                    : "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </section>

        {/* Database List - Cards on mobile, Table on desktop */}
        <section className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/50 dark:border-neutral-800 shadow-sm overflow-hidden">
          
          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-neutral-100 dark:divide-neutral-800">
            {filteredItems.length === 0 ? (
              <div className="px-6 py-16 text-center text-neutral-400 font-medium">
                No encontramos ningún plato que coincida con los filtros aplicados.
              </div>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id} className="p-4 flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-neutral-200/60 dark:ring-neutral-700/60 shadow-sm">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="56px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm text-neutral-900 dark:text-white truncate">
                        {item.title}
                      </span>
                      {item.isPopular && (
                        <span className="bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full flex-shrink-0">
                          Pop
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-neutral-400">
                      <span className="bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
                        {CATEGORIES.find(c => c.id === item.category)?.name || item.category}
                      </span>
                      <span>⏱️ {item.prepTime}</span>
                    </div>
                    <div className="font-extrabold text-sm text-neutral-900 dark:text-white mt-0.5">
                      {formatCOP(item.price)}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2.5 text-neutral-400 hover:text-orange-500 dark:text-neutral-500 dark:hover:text-orange-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-2.5 text-neutral-400 hover:text-red-500 dark:text-neutral-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-neutral-500 dark:text-neutral-400">
              <thead className="bg-neutral-50 dark:bg-neutral-800/40 text-xs font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-100 dark:border-neutral-800">
                <tr>
                  <th scope="col" className="px-6 py-4">Plato / Descripción</th>
                  <th scope="col" className="px-6 py-4">Categoría</th>
                  <th scope="col" className="px-6 py-4">Precio COP</th>
                  <th scope="col" className="px-6 py-4">Tiempo Prep.</th>
                  <th scope="col" className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-neutral-400 font-medium">
                      No encontramos ningún plato que coincida con los filtros aplicados.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="">
                      {/* Image + Title */}
                      <td className="px-6 py-4 flex gap-4 items-center min-w-[300px]">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-neutral-200/60 dark:ring-neutral-700/60 shadow-sm">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-neutral-900 dark:text-white truncate">
                              {item.title}
                            </span>
                            {item.isPopular && (
                              <span className="bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-neutral-400 dark:text-neutral-500 line-clamp-1 mt-0.5">
                            {item.description}
                          </span>
                        </div>
                      </td>
                      
                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-350">
                          {CATEGORIES.find(c => c.id === item.category)?.name || item.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 font-extrabold text-neutral-900 dark:text-white">
                        {formatCOP(item.price)}
                      </td>

                      {/* Prep Time */}
                      <td className="px-6 py-4 text-xs font-medium text-neutral-400 dark:text-neutral-500">
                        <span>⏱️ {item.prepTime}</span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-3 text-neutral-400 hover:text-orange-500 dark:text-neutral-500 dark:hover:text-orange-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                            title="Editar plato"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.title)}
                            className="p-3 text-neutral-400 hover:text-red-500 dark:text-neutral-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                            title="Eliminar plato"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* --- ADD / EDIT DISH MODALS --- */}
      <AnimatePresence>
        {(isAddModalOpen || editingItem) && (
          <>
            {/* Modal Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingItem(null);
              }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-x-4 bottom-4 top-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-full max-w-lg bg-white dark:bg-neutral-900 rounded-[2.5rem] shadow-2xl border border-neutral-100 dark:border-neutral-800 p-6 flex flex-col justify-between max-h-[90vh] overflow-y-auto"
            >
              {/* Form Modal Header */}
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4 mb-4">
                <h3 className="text-lg font-black text-neutral-900 dark:text-white">
                  {isAddModalOpen ? "Agregar Nuevo Plato" : `Editar Plato: ${editingItem?.title}`}
                </h3>
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingItem(null);
                  }}
                  className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Input fields */}
              <form 
                onSubmit={handleSubmit(isAddModalOpen ? onAddSubmit : onEditSubmit)}
                className="space-y-4 flex-1"
              >
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                    Nombre del Plato *
                  </label>
                  <input
                    type="text"
                    {...register("title")}
                    placeholder="Ej. Truffle Umami Smash"
                    className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:border-orange-500 dark:text-white transition-colors min-h-[44px]"
                  />
                  {errors.title && (
                    <span className="text-xs text-red-500 font-semibold">{errors.title.message}</span>
                  )}
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                    Categoría del Menú *
                  </label>
                  <select
                    {...register("category")}
                    className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:border-orange-500 dark:text-white transition-colors min-h-[44px]"
                  >
                    {CATEGORIES.filter(c => c.id !== "all").map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <span className="text-xs text-red-500 font-semibold">{errors.category.message}</span>
                  )}
                </div>

                {/* Image URL */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                    URL de la Imagen *
                  </label>
                  <input
                    type="text"
                    {...register("image")}
                    placeholder="Dirección URL de Unsplash u otra fuente"
                    className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:border-orange-500 dark:text-white transition-colors min-h-[44px]"
                  />
                  {errors.image && (
                    <span className="text-xs text-red-500 font-semibold">{errors.image.message}</span>
                  )}
                </div>

                {/* Price and PrepTime Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                      Precio COP *
                    </label>
                    <input
                      type="number"
                      {...register("price", { valueAsNumber: true })}
                      className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:border-orange-500 dark:text-white transition-colors min-h-[44px]"
                    />
                    {errors.price && (
                      <span className="text-xs text-red-500 font-semibold">{errors.price.message}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                      Preparación (minutos)
                    </label>
                    <input
                      type="text"
                      {...register("prepTime")}
                      placeholder="Ej. 12-15 min"
                      className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:border-orange-500 dark:text-white transition-colors min-h-[44px]"
                    />
                    {errors.prepTime && (
                      <span className="text-xs text-red-500 font-semibold">{errors.prepTime.message}</span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                    Descripción del Plato *
                  </label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    placeholder="Escribe los ingredientes clave y el sazón del plato..."
                    className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:border-orange-500 dark:text-white transition-colors resize-none min-h-[44px]"
                  />
                  {errors.description && (
                    <span className="text-xs text-red-500 font-semibold">{errors.description.message}</span>
                  )}
                </div>

                {/* Switched tags (Popular / Bestseller) */}
                <div className="flex items-center gap-3 py-2">
                  <input
                    type="checkbox"
                    id="isPopular"
                    {...register("isPopular")}
                    className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
                  />
                  <label 
                    htmlFor="isPopular"
                    className="text-sm font-semibold text-neutral-750 dark:text-neutral-200 select-none cursor-pointer"
                  >
                    🔥 Marcar como plato popular (&ldquo;Más Vendido&rdquo;)
                  </label>
                </div>

                {/* Submit Action Block */}
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800 mt-6 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setEditingItem(null);
                    }}
                    className="px-5 py-3 text-sm font-bold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-300 rounded-xl cursor-pointer min-h-[44px]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-3 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all cursor-pointer min-h-[44px]"
                  >
                    {isAddModalOpen ? "Guardar Plato" : "Actualizar Datos"}
                  </button>
                </div>

              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
