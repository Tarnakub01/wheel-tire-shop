// export async function getProducts() {
//     try{
//         const response = await fetch("/src/data/products.mock.json");

//         if(!response.ok){
//             throw new Error("failed to fetch products");
//         }

//         const data = await response.json();

//         return {data, error: null};
//     }catch(error){
//         return {data: null, error}
//     }

// }
import type { ApiResult, AppError } from "../types";
import type { Product } from "../types";

function createError(
  type: AppError["type"],
  message: string,
  originalError?: unknown,
): AppError {
  return {
    type,
    message,
    originalError,
  };
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("/products.mock.json");

  if (!response.ok) throw new Error("failed to fetch Products");
  return response.json();
}

export async function getProducts(): Promise<ApiResult<Product[]>> {
  try {
    // Start test Error
    await delay(300);

    if (shouldFail()) {
      throw new Error("Simulated network error");
    }
    // end test Error
    const data = await Promise.race([fetchProducts(), timeout(1500)]);

    return { data, error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    const error = 
    msg.toLowerCase().includes("timeout")
    ? createError("TIMEOUT", "การเชื่อมต่อใช้เวลานานเกินไปกรุณาลองใหม่", err)
    : createError("NETWORK", "ไม่สามารถโหลดสินค้าได้กรุณาลองใหม่", err)



    // ของเก่า
    // if (err.message.includes("timeout")) {
    //   error = createError(
    //     "TIMEOUT",
    //     "การเชื่อมต่อใชเสลานานเกินไป กรุณาลองใหม่",
    //     err,
    //   );
    // } else {
    //   error = createError(
    //     "NETWORK",
    //     "ไม่สามารถโหลดสินค้าได้ กรุณาลองใหม่",
    //     err,
    //   );
    // }
    return { data: null, error };
  }
}

// Test Error

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timeout")), ms),
  );
}

function shouldFail(): boolean {
  return Math.random() < 0.1;
}
