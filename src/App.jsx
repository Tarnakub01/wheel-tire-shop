import { useEffect, useState } from "react";
import { getProducts } from "../../src/api/products";
import { ProductCart } from "./components/ProductCard";
import {addToCart, calcCartTotals} from "./utils";


export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([])

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      setError(null);

      const { data, error } = await getProducts();

      if (!isMounted) return;

      if (error) {
        setError(error.message ?? "unknown error");
        setProducts([]);
      } else {
        setProducts(data ?? []);
      }
      setLoading(false); //แปลว่าสิ้นสุดการโหลด
    }
    load();

    return () => {
      isMounted = false;
    };
  }, []);

  
 // ===== cart handler =====
  function handleAddToCart(product) {
    setCart((prevCart) =>
      addToCart(prevCart, {
        ...product,
        qty: 1,
      })
    );
  }

const totals = calcCartTotals(cart);


  if (loading) {
    return <div style={{ padding: 16 }}>Loading Products...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: 16 }}>
        <div style={{ color: "crimsom", fontWeight: 600 }}>ERROR</div>
        <div>{error}</div>
        <button
          onClick={() => window.location.reload()}
          style={{ marginTop: 12 }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Wheel & Tire Shop</h1>

{/* Cart Summary */}
      <div style={{ marginBottom: 16, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
        <div style={{ fontWeight: 600 }}>Cart Summary</div>
        <div>Total Qty: {totals.totalQty}</div>
        <div>Subtotal: {totals.subtotal}</div>
      </div>


      {products.length === 0 ? (
        <div>No products</div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {products.map((p) => (
            <ProductCart key={p.id} product={p} onAdd={handleAddToCart} />
            
          ))}
        </div>
      )}
    </div>
  );
}

