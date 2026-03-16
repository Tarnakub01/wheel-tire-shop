import {FilterBar} from "../components/filterBar"
import { ProductGrid } from "../components/ProductsGrid";

export function ProductsPage({
    toast,
    visibleCount,
    totalCount,
    query,
    onQueryChange,
    category,
    onCategoryChange,
    sort,
    onSortChange,
    onClear,
    visibleProducts,
    onAddToCart,
    stockById,
    cartQtyById,
}){
    return (
        <div>
            <h2 style={{marginTop: 0}}>Products</h2>

            {/* toast */}
            {toast && (
                <div
                style={{
                    marginBottom: 12,
                    padding: 10,
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    background:
                    toast.type === "success"
                    ? "#e8fff0"
                    : toast.type === "warn"
                    ? "#fff7e6"
                    : "#eef5ff",
                }}
                >
                    {toast.message}
                </div>
            )}

            <div style={{ marginBottom: 8, fontSize: 12, color: "#555"}}>
                Showing {visibleCount} of {totalCount} products
            </div>
            
            <FilterBar
            query={query}
            onQueryChange={onQueryChange}
            category={category}
            onCategoryChange={onCategoryChange}
            sort={sort}
            onSortChange={onSortChange}
            onClear={onClear}
            />

            <ProductGrid
            products={visibleProducts}
            onAddToCart={onAddToCart}
            stockById={stockById}
            cartQtyById={cartQtyById}

            />

        </div>
    )
}