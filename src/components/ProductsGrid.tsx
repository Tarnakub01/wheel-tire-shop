import { ProductCard } from "./ProductCard";
import type { Product } from "../types";

type ProductGridProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
  stockById?: Record<number, number>;
  cartQtyById?: Record<number, number>;
}
export function ProductGrid({ products, onAddToCart, stockById, cartQtyById }:ProductGridProps) {
  if (products.length === 0) return <div>No products match your search</div>;

  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
      {products.map((p) => {
        const maxStock = stockById?.[p.id] ?? p.stock ?? 0;
        const inCartQty = cartQtyById?.[p.id] ?? 0;
        const reachedMax = maxStock > 0 && inCartQty >= maxStock; //maxstock ต้องมากกว่า 0 อบู่แล้วจรึงเตรียม ture ไว้ ส่วน inCartQty เริ่มแรกมันน้อยกว่า maxstock จึงเป็น false && จึงได้ค่า false ออกมา
        //เมื่อไหร่ก็ตามที่ inCartQty เท่ากับ maxstock จะเป็น ture && ture ทันที reachedMaX ถึงจะเป็นจริง นั้นหมายความว่าเพิ่มถึงขีดสุดแล้วไม่สามารถเพิ่มได้กว่าค่า maxstock

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