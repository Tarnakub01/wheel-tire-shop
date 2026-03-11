import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, onAddToCart, stockById, cartQtyById }) {
  if (products.length === 0) return <div>No products match your search</div>;

  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
      {products.map((p) => {
        const maxStock = stockById?.[p.id] ?? p.stock ?? 0;
        const inCartQty = cartQtyById?.[p.id] ?? 0;
        const reachedMax = maxStock > 0 && inCartQty >= maxStock;

        return (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={onAddToCart}
            maxStock={maxStock}
            inCartQty={inCartQty}
            reachedMax={reachedMax}
          />
        );
      })}
    </div>
  );
}