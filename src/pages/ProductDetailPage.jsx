import { Link, useParams } from "react-router-dom";
import { formatCurrency } from "../utils";

export function ProductDetailPage({ products, onAddToCart}){
    const {id} = useParams();
    const productId = Number(id);

    const product = products.find((p)=> p.id === productId);

    if (!product){
        return (
            <div>
                <h2 style={{ marginTop: 0}}>Product Not Found</h2>
                <Link to="/products">Back to products</Link>
            </div>
        );
    }

    return (
        <div>
            <h2 style={{ marginTop: 0}}>{product.name}</h2>

            <div style={{ marginBottom: 8}}>Category: {product.category}</div>
            <div style={{ marginBottom: 8}}>
                Price: {formatCurrency(product.price)}
            </div>
            <div style={{ marginBottom: 16}}>Stock: {product.stock}</div>

            <button type="button"
            onClick={() => onAddToCart(product)}
            disabled={(product.stock ?? 0) <= 0}
            style={{ opacity: (product.stock ?? 0) <= 0 ? 0.5 : 1}}
            >
                {(product.stock ?? 0) <= 0 ? "Out of Stock" : "Add to Cart"}
            </button>

            <div style={{ marginTop: 16}}>
                <Link to="/products">← Back to products</Link>
            </div>
        </div>
    )
}