export function calcLineTotal(item){
    if(!item || typeof item.price !== "number" || typeof item.qty !== "number"){
        throw new Error("Invalid item: price and qty must be number");
    }

    if(item.price < 0 || item.qty < 0){
        throw new Error("price and qty must be non-negative");
    }
    return item.price * item.qty
}

export function calcCartTotals(cart){
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

export function getSaleItems(cart){
    if(!Array.isArray(cart)) throw new Error("cart must be an array");
    return cart.filter((item) => item.isSale === true);
}

export function applyDiscount(cart, rate){
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


export function addToCart(cart, product) {
  if (!Array.isArray(cart)) {
    throw new Error("cart must be an array");
  }
  if (!product || typeof product.id === "undefined") {
    throw new Error("product must have an id");
  }

  const existingItem = cart.find(item => item.id === product.id);

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

  return cart.concat({
    ...product,
    qty: product.qty ?? 1,
  });
}

export function removeFromCart(cart, productId){
    if(!Array.isArray(cart)) throw new Error("cart must be an array");
    if(typeof productId === "undefined") throw new Error("product is required");

    return cart.filter(item => item.id !== productId);
}
    



// ให้ removeFromCart อยู่เหนือ updateQty ในไฟล์เดียวกันได้เลย
export function updateQty(cart, productId, qty) {
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