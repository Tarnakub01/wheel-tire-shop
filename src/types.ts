

export type ProductCategory = "tire" | "wheel" | "electronics" | "all";

export type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    qty?: number;
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

export type AppErrorType = "TIMEOUT" | "NETWORK" | "HTTP" | "UNKNOWN";

export type AppError = {
    type: AppErrorType;
    message: string;
    originalError?: unknown;
};

export type ApiResult<T> = {
    data: T | null;
    error: AppError | null;    
}