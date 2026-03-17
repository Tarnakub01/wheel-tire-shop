import {FilterBar} from "../components/filterBar"
import { ProductGrid } from "../components/ProductsGrid";

export function ProductsPage({
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