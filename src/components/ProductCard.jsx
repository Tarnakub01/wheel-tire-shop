export function ProductCart({ product, onAdd }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <div style={{ fontWeight: 600 }}>{product.name}</div>
      <div>Category: {product.category}</div>
      <div>Price: {product.price}</div>
      <div>Stock: {product.stock}</div>

      <button style={{ marginTop: 12 }} onClick={() => onAdd(product)}>
        Add to cart
      </button>
    </div>
  );
}
