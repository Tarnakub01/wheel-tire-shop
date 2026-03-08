import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      setError(null);

      const { data, error } = await getProducts();

      if (!isMounted) return;

      if (error) {
        setError(error.message ?? "umknown error");
        setProducts([]);
      } else {
        setProducts(data ?? []);
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
