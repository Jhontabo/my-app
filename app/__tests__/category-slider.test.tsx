import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CategorySlider from "@/components/CategorySlider";

describe("CategorySlider", () => {
  it("renderiza todas las categorías", () => {
    render(<CategorySlider activeCategory="all" setActiveCategory={vi.fn()} />);
    expect(screen.getAllByText("Todo el Menú").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Hamburguesas").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Pizzas").length).toBeGreaterThan(0);
  });

  it("llama a setActiveCategory al hacer clic en un botón de categoría", () => {
    const setActive = vi.fn();
    render(<CategorySlider activeCategory="all" setActiveCategory={setActive} />);
    const buttons = screen.getAllByRole("button");
    const pizzaBtn = buttons.find((btn) => btn.textContent?.includes("Pizzas"));
    expect(pizzaBtn).toBeDefined();
    if (pizzaBtn) fireEvent.click(pizzaBtn);
    expect(setActive).toHaveBeenCalledWith("pizza");
  });
});
