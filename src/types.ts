export type ProductCategory = "tire" | "wheel" | "electronics" | "all";

export type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    qty: number;
    stock?: number;
    isSale?: boolean;
};

export type CartItem = {
    id: number;
    name: string;
    category: string;
    price: number;
    qty: number;
    stock?: number;
    isSale?: boolean;
};

export type CartTotals = {
    subtotal: number;
    totalqty: number;
}