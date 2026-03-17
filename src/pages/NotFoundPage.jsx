import { Link } from "react-router-dom";

export function NotFoundPage(){
    return (
        <div>
            <h2 style={{ marginTop:0}}>404 - Page Not Found</h2>
            <div style={{marginBottom: 12, color: "#555"}}>
                The page you are looking for doesn't exist.
            </div>
            <Link to="/products">Go to products</Link>
        </div>
    )
}