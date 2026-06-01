"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { FoodItem, FOOD_ITEMS } from "@/data/foodData";

interface MenuContextType {
  menu: FoodItem[];
  addFoodItem: (item: Omit<FoodItem, "id">) => void;
  updateFoodItem: (item: FoodItem) => void;
  deleteFoodItem: (itemId: string) => void;
  resetMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState<FoodItem[]>([]);

  // Load menu from localStorage on mount
  useEffect(() => {
    const savedMenu = localStorage.getItem("bitebox_menu");
    if (savedMenu) {
      try {
        setMenu(JSON.parse(savedMenu));
      } catch (e) {
        console.error("Failed to parse local menu data", e);
        setMenu(FOOD_ITEMS);
      }
    } else {
      // Initialize with default gourmet menu
      setMenu(FOOD_ITEMS);
      localStorage.setItem("bitebox_menu", JSON.stringify(FOOD_ITEMS));
    }
  }, []);

  // Save menu to localStorage on state changes
  const saveMenu = (newMenu: FoodItem[]) => {
    setMenu(newMenu);
    localStorage.setItem("bitebox_menu", JSON.stringify(newMenu));
  };

  const addFoodItem = (item: Omit<FoodItem, "id">) => {
    const newId = `custom_${Date.now()}`;
    const newItem: FoodItem = {
      ...item,
      id: newId,
    };
    saveMenu([...menu, newItem]);
  };

  const updateFoodItem = (updatedItem: FoodItem) => {
    const updatedMenu = menu.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    saveMenu(updatedMenu);
  };

  const deleteFoodItem = (itemId: string) => {
    const updatedMenu = menu.filter((item) => item.id !== itemId);
    saveMenu(updatedMenu);
  };

  const resetMenu = () => {
    if (window.confirm("¿Estás seguro de que deseas restaurar el menú original predeterminado? Se perderán todos tus cambios personalizados.")) {
      saveMenu(FOOD_ITEMS);
    }
  };

  return (
    <MenuContext.Provider
      value={{
        menu,
        addFoodItem,
        updateFoodItem,
        deleteFoodItem,
        resetMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
