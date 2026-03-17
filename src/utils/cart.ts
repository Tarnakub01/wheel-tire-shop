import type { CartItem, CartTotals, Product } from "../types";
export function calcLineTotal(item:Product){
    if(!item || typeof item.price !== "number" || typeof item.qty !== "number"){
        throw new Error("Invalid item: price and qty must be number");
    }

    if(item.price < 0 || item.qty < 0){
        throw new Error("price and qty must be non-negative");
    }
    return item.price * item.qty
}

export function calcCartTotals(cart:CartItem[]):CartTotals{
    if (!Array.isArray(cart)) throw new Error("cart must be an array");

    return cart.reduce(
        (acc, item)=> {
            const lineTotal = calcLineTotal(item);
            acc.subtotal += lineTotal;
            acc.totalqty += item.qty;
            return acc
        },
        {subtotal:0, totalqty:0}
    )
}

export function getSaleItems(cart:CartItem[]):CartItem[]{
    if(!Array.isArray(cart)) throw new Error("cart must be an array");
    return cart.filter((item) => item.isSale === true);
}

export function applyDiscount(cart:CartItem[], rate:number){
    if(!Array.isArray(cart)) throw new Error("cart must be an array");
    if(typeof rate !== "number" || rate < 0 || rate > 1){
        throw new Error("rate must be a number between 0 and 1");
    }
    return cart.map(item => ({
        ...item,
        price: item.price * (1-rate),
        isSale: true,
    }))
}


export function addToCart(cart: CartItem[] , product: Product & {qty?: number}): CartItem[] {
  if (!Array.isArray(cart)) {
    throw new Error("cart must be an array");
  }
  if (!product || typeof product.id !== "number") {
    throw new Error("product must have an id");
  }

  const existingItem = cart.find(item => item.id === product.id); // ถ้าเกิดว่ากด addTocart ครั้งแรก cartเราจะเป็น[] เราอาจจะกด add product.id=1 
  // เมื่อมันไม่เจอเลยมันจะคืนค่า undefined กลับไปที่ existingItem if จึงไม่ทงาน ข้ามไปทำ cart.concat หรือเอา ค่าของ ...product ไปต่อใน array of cart 
  // จากนั้น ก็จะ retrun กลับไป update ค่าของ cart(setCart) หน้าตาใหม่ของ cart = ["id": 1,"name": "Tire A","category": "tire", "price": 3500,"stock": 10]
  //ถ้าเกิดว่ามีการกดรอบที่ 2 ก็จะไห้ prevCart ไปดึงเอาค่า cart ที่อัปเดทแล้วมาเก็บไว้ในตัวเองแล้วส่งเข้ามาไห้ paramiter cart ใน fn ทำงาน
  // สมมุติ มี 2 id แล้ว .find ก็ทำการเปลียบเทียบ item ไปค้นดูใน cart ที่มี 2 id หยิบ index แรก ที่เป็น id=1 เปลียบเทียบ item.id(1) === product.id(อยู่ที่ผู้ใช้กด + หรือ addTocart)
  // ตอนนี้ไห้ product.id === 2 เมื่อ 1 เจอ 2 หรือ 1===2 เป็น false คือไม่สนใจ ไปหยิบ itemid=2 ต่อ หา 2===2 ture ผ่านไปใน if existingItem สิ่งที่ผ่านไปคือทั้งก้อน array id2
  // แล้วให้ เอา item ที่รอดเข้ามาหรือ id2 ...item เอามาเทออก แล้วแก้ qty (สมมุติว่าitem.qty คือ 1) ก็จะเอา item.qty ไป + กับ product.qty 
  // ที่ส่งเข้ามา ที่เราสั่งแก้ค่ามันไห้เป็น 1 เรียบร้อย ก็จะเป็น 1+1 = 2 return object ใหม่ออกไปทั้งก้อนที่ + qty เรียบร้อย ส่วน id1 ที่ไม่ตรง ก็โดน return item ออกไปเป็นหน้าตาเดิม

  if (existingItem) {
    return cart.map(item => {
      if (item.id === product.id) {
        return {
          ...item,
          qty: item.qty + (product.qty ?? 1),
        };
      }
      return item;
    });
  }

  // if (existingItem) {
  //   const addQty = product.qty ?? 1;
  //   return cart.map((item) =>
  //     item.id === product.id ? { ...item, qty: item.qty + addQty } : item
  //   );
  // }

  return cart.concat({
    ...product,
    qty: product.qty ?? 1,
  });
}

export function removeFromCart(cart: CartItem[], productId: number):CartItem[]{
    if(!Array.isArray(cart)) throw new Error("cart must be an array");
    if(typeof productId === "undefined") throw new Error("product is required");

    return cart.filter(item => item.id !== productId);
}
    



// ให้ removeFromCart อยู่เหนือ updateQty ในไฟล์เดียวกันได้เลย
export function updateQty(cart:CartItem[], productId: number, qty:number):CartItem[] {
  if (!Array.isArray(cart)) {
    throw new Error("cart must be an array");
  }
  if (typeof productId === "undefined") {
    throw new Error("productId is required");
  }
  if (typeof qty !== "number" || Number.isNaN(qty)) {
    throw new Error("qty must be a number");
  }

  if (qty <= 0) {
    return removeFromCart(cart, productId);
  }

  return cart.map(item => {
    if (item.id === productId) {
      return { ...item, qty };
    }
    return item;
  });
}