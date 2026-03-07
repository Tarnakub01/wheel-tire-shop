import { useEffect, useState } from "react";
import { getProducts } from "../../src/api/products";
import { ProductCart } from "./components/ProductCard";
import {addToCart, calcCartTotals,updateQty,removeFromCart} from "./utils";

const CART_STORAGE_KEY = "wheel-tire-shop:cart:v1"

export default function App() {
  const [products, setProducts] = useState([]);  //cosnt [ตัวแปที่ใช้ดึงค่า, ตัวแปลที่ใช้เปลี่นยค่า] = useState(ค่าเริ่มต้น)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(()=>{
    try{
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if(!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    }catch{
      return[];
    }
  })

  useEffect(() => {

    let isMounted = true;

    async function load() {
      setLoading(true);
      setError(null);

      const { data, error } = await getProducts();

      if (!isMounted) return;

      if (error) {
        setError(error.message ?? "unknown error"); // ถ้าดึงข้อมูลพัง ให้จด Error ลงความจำ (?? คือ ถ้าไม่มี message ให้ใช้คำว่า unknown error แทน)
        setProducts([]);
      } else {
        setProducts(data ?? []);
      }
      setLoading(false); //แปลว่าสิ้นสุดการโหลด
    }
    load();

    return () => {
      isMounted = false; // ถ้าผู้ใช้กดปิดหน้าเว็บ หรือย้ายหน้า ให้เปลี่ยนเป็น false (บอกระบบว่าหน้านี้ตายแล้ว)
    };
  }, []); // 2. วงเล็บเหลี่ยมว่างๆ ตรงนี้สำคัญมาก! แปลว่า "ให้ทำคำสั่งใน useEffect ทั้งหมดนี้ แค่ครั้งเดียวตอนเปิดหน้าเว็บเท่านั้น"

  
  useEffect(()=>{
      try{
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }catch{
      // ถ้า storage เต็ม/blocked ก็ไม่ให้แอปพัง
    }
  },[cart])
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

  function handleIncrease(productId){
    setCart((prevCart)=>{
      const item = prevCart.find((x)=> x.id === productId);
      if(!item) return prevCart;
      return updateQty(prevCart,productId, item.qty+1);
    });
  }

  function handleDecrease(productId){
    setCart((prevCart)=>{
      const item = prevCart.find((x)=> x.id === productId);
      if(!item) return prevCart;
      
      return updateQty(prevCart, productId, item.qty - 1);
    });
  }

  function handleRemove(productId){
    setCart((prevCart)=> removeFromCart(prevCart, productId))
  }


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
        <div>Total Qty: {totals.totalqty}</div>
        <div>Subtotal: {totals.subtotal}</div>
      </div>

{/* Cart Item */}
      <div style={{marginBottom:16 , padding: 12, border: "1px solid #ddd", borderRadius: 8}}>
        <div style={{fontWeight: 600, marginBottom: 8}}>Cart Item</div>
        {cart.length === 0 ? (
          <div>Your cart is empty.</div>
        ) : (
          <div style={{display:"grid",gap: 8}}>
            {cart.map((item=>(
              <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: 10,
                border: "1px solid #eee",
                borderRadius: 8,
              }}
              >
                <div style={{flex: 1}}>
                  <div style={{fontWeight: 600}}>{item.name}</div>
                  <div style={{fontSize:  12}}>Price: {item.price}</div>
                </div>

                <div style={{display: "flex", alignItems: "center",gap: 6}}>
                  <button onClick={()=> handleDecrease(item.id)}>-</button>
                  <div style={{minWidth: 24, textAlign: "center"}}>{item.qty}</div>
                  <button onClick={()=> handleIncrease(item.id)}>+</button>
                </div>

                <div style={{minWidth: 110, textAlign: "right"}}>
                  Line: {item.price * item.qty}
                </div>

                <button onClick={()=> handleRemove(item.id)}>Remove</button>
              </div>
            )))}
          </div>
        )}
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
  );}

