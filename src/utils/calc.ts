export function calcLineTotal(price: number, qty: number){
    if(price < 0 || qty < 0){
        throw new Error("price and qty must be positive numbers");
    }
    return price * qty
}