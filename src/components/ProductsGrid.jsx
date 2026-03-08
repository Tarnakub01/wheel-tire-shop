import { ProductCard } from "./ProductCard";

export function ProductGrid({products, onAddToCart}){
    if(products.length === 0){
        return <div>No products match your search</div>
    }

    return (
        <div style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
        >
            {products.map((p)=>(
                <ProductCard key={p.id} product={p} onAdd={onAddToCart}/>
            ))}
        </div>
    );
}
