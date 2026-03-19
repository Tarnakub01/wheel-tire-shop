import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import type { ApiResult, Product, AppError } from "../types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      setError(null);

      // const { data, error } = await getProducts();

      const result: ApiResult<Product[]> = await getProducts();

      if (!isMounted) return;

      if (result.error) {
        // setError(error.message ?? "umknown error");
        // setProducts([]);
        setError(result.error);
        setProducts([]);
      } else {
        setProducts(result.data ?? []);
      }

      setLoading(false);
    }
    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading, error };
}
