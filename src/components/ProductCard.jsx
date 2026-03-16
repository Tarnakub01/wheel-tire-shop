import { Link } from "react-router-dom";
export function ProductCard({
  product,
  onAdd,
  maxStock,
  inCartQty,
  reachedMax,
}) {
  const outOfStock = (maxStock ?? product.stock ?? 0) <= 0;
  const disabled = outOfStock || reachedMax;
  const label = outOfStock
    ? "Out of Stock"
    : reachedMax
      ? "Max stock reached"
      : "Add to Cart";
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      {product.isSale && (
        <div style={{ fontSize: 12, color: "#0a7", fontWeight: 600 }}>SALE</div>
      )}
      <Link
        to={`/products/${product.id}`}
        style={{ fontWeight: 600, textDecoration: "none", color: "#111" }}
      >
        {product.name}
      </Link>
      <div>Category: {product.category}</div>
      <div>Price: {product.price}</div>
      <div>Stock: {maxStock ?? product.stock}</div>
      <div>In cart: {inCartQty}</div>

      <button
        type="button"
        onClick={() => onAdd(product)}
        disabled={disabled}
        style={{ marginTop: 12, opacity: disabled ? 0.5 : 1 }}
      >
        {label}
      </button>
    </div>
  );
}
