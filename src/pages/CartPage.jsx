// ทำไมใช้ children ก่อน?

import { formatCurrency } from "../utils";

// เพราะชั่วโมงนี้เราจะ “ตั้ง routing” ให้ทำงานก่อน แล้วชั่วโมงต่อไปค่อยย้าย content เข้า page ทีละก้อน (best practice แบบไม่พัง)
export function CartPage({
  cart,
  totals,
  stockById,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Cart</h2>
      <div style={{ marginBottom: 12, fontSize: 12, color: "#555" }}>
        Item in cart <b>{totals.totalqty}</b>
      </div>

      {/* Cart summary */}
      <div
        style={{
          marginBottom: 16,
          padding: 12,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      >
        <div style={{ fontWeight: 600 }}>Cart Summary</div>
        <div>Total Qty {totals.totalqty}</div>
        <div>Subtotal {formatCurrency(totals.subtotal)}</div>
      </div>

      {/* Cart List */}
      <div
        style={{
          marginBottom: 16,
          padding: 12,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Cart Items</div>

        {cart.length === 0 ? (
          <div>Your cart is empty</div>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            {cart.map((item) => {
              const maxStock = stockById[item.id] ?? 0;
              const isAtMax = item.qty >= maxStock;
              const canDecrease = item.qty > 1;
              return (
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
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: 12 }}>
                      Price: {formatCurrency(item.price)}
                    </div>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      Stock: {maxStock}
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <button
                      type="button"
                      onClick={() => onDecrease(item.id)}
                      disabled={!canDecrease}
                      style={{ opacity: canDecrease ? 1 : 0.5 }}
                    >
                      -
                    </button>
                    <div style={{ minWidth: 24, textAlign: "center" }}>
                      {item.qty}
                    </div>
                    <button
                      type="button"
                      onClick={() => onIncrease(item.id)}
                      style={{ opacity: maxStock === 0 || isAtMax ? 0.5 : 1 }}
                    >
                      +
                    </button>

                    <div style={{ minWidth: 110, textAlign: "right" }}>
                      Line: {formatCurrency(item.price * item.qty)}
                    </div>

                    <button type="button" onClick={() => onRemove(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
