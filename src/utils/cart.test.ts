import { describe, it, expect } from "vitest";
import { addToCart, removeFromCart, updateQty, calcCartTotals } from "./cart";
import type { CartItem, Product } from "../types";

describe("cart utils", () => {
  it("addToCart should add new item when not exists", () => {
    const cart: CartItem[] = [];
    const product: Product = { id: 1, name: "Tire A", category: "tire", price: 3500, stock: 10 };

    const out = addToCart(cart, product);

    expect(out).toHaveLength(1);
    expect(out[0]!.id).toBe(1);
    expect(out[0]!.qty).toBe(1);

    // immutable check
    expect(cart).toHaveLength(0);
  });

  it("addToCart should increase qty when item exists", () => {
    const cart: CartItem[] = [{ id: 1, name: "Tire A", category: "tire", price: 3500, qty: 1 }];
    const product: Product = { id: 1, name: "Tire A", category: "tire", price: 3500 };

    const out = addToCart(cart, product);

    expect(out).toHaveLength(1);
    expect(out[0]!.qty).toBe(2);

    // original not mutated
    expect(cart[0]!.qty).toBe(1);
  });

  it("updateQty should update qty when qty > 0", () => {
    const cart: CartItem[] = [{ id: 1, name: "Wheel B", category: "wheel", price: 12000, qty: 2 }];

    const out = updateQty(cart, 1, 5);

    expect(out[0]!.qty).toBe(5);
    expect(cart[0]!.qty).toBe(2);
  });

  it("updateQty should remove item when qty <= 0", () => {
    const cart: CartItem[] = [
      { id: 1, name: "Wheel B", category: "wheel", price: 12000, qty: 1 },
      { id: 2, name: "Tire A", category: "tire", price: 3500, qty: 2 },
    ];

    const out = updateQty(cart, 1, 0);

    expect(out).toHaveLength(1);
    expect(out[0]!.id).toBe(2);
  });

  it("removeFromCart should remove by id", () => {
    const cart: CartItem[] = [
      { id: 1, name: "Wheel B", category: "wheel", price: 12000, qty: 1 },
      { id: 2, name: "Tire A", category: "tire", price: 3500, qty: 2 },
    ];

    const out = removeFromCart(cart, 2);

    expect(out).toHaveLength(1);
    expect(out[0]!.id).toBe(1);
    expect(cart).toHaveLength(2); // not mutated
  });

  it("calcCartTotals should return subtotal and totalQty", () => {
    const cart: CartItem[] = [
      { id: 1, name: "Wheel B", category: "wheel", price: 12000, qty: 2 },
      { id: 2, name: "Tire A", category: "tire", price: 3500, qty: 4 },
    ];

    const totals = calcCartTotals(cart);

    expect(totals.totalqty).toBe(6);
    expect(totals.subtotal).toBe(12000 * 2 + 3500 * 4);
  });
});