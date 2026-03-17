import { Link, useParams, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils";

export function ProductDetailPage({ products, onAddToCart}){
    const {id} = useParams();
    const productId = Number(id);
    const navigate = useNavigate();
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
            <div style={{ marginBottom: 12, fontSize: 12, color: "#555"}}>
                <Link to="/products" style={{color: "#555", textDecoration: "none"}}>
                Products
                </Link>{" "}
                / <span style={{ fontWeight: 600}}>{product.name}</span>
            </div>

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

            <button type="button" onClick={() => navigate(-1)} style={{marginTop: 16}}>
                 ← Back
            </button>

        </div>
    )
}