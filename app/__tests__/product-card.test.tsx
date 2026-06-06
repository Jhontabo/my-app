import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";
import type { FoodItem } from "@/data/foodData";

const mockItem: FoodItem = {
  id: "test-1",
  title: "Truffle Umami Smash",
  description: "Doble carne premium de res Angus smash",
  image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
  category: "burgers",
  price: 34900,
  prepTime: "12-15 min",
  isPopular: true,
};

describe("ProductCard", () => {
  it("renderiza el título del producto", () => {
    render(<ProductCard item={mockItem} onSelect={vi.fn()} />);
    expect(screen.getAllByText("Truffle Umami Smash").length).toBeGreaterThan(0);
  });

  it("renderiza la descripción del producto", () => {
    render(<ProductCard item={mockItem} onSelect={vi.fn()} />);
    expect(
      screen.getAllByText("Doble carne premium de res Angus smash").length,
    ).toBeGreaterThan(0);
  });

  it("muestra la etiqueta 'Más Vendido' si es popular", () => {
    render(<ProductCard item={mockItem} onSelect={vi.fn()} />);
    expect(screen.getAllByText("Más Vendido").length).toBeGreaterThan(0);
  });

  it("muestra el precio en formato COP", () => {
    render(<ProductCard item={mockItem} onSelect={vi.fn()} />);
    expect(screen.getAllByText("$ 34.900").length).toBeGreaterThan(0);
  });

  it("muestra el tiempo de preparación", () => {
    render(<ProductCard item={mockItem} onSelect={vi.fn()} />);
    expect(screen.getAllByText("⏱️ 12-15 min").length).toBeGreaterThan(0);
  });

  it("no muestra 'Más Vendido' si no es popular", () => {
    const notPopular = { ...mockItem, isPopular: false };
    render(<ProductCard item={notPopular} onSelect={vi.fn()} />);
    expect(screen.queryByText("Más Vendido")).not.toBeInTheDocument();
  });
});
