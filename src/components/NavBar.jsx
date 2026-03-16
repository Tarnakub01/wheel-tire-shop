import {NavLink} from "react-router-dom";
export function NavBar({cartCount}){
    const linkStyle = ({ isActive }) => ({
        padding: "8px 10px",
        borderRadius: 8,
        textDecoration: "non",
        border: "1px solid #ddd",
        background: isActive ? "#eef5ff": "white",
        color: "#111",
    });

    return (
        <div style={{display: "flex", gap:10, marginBottom: 16}}
        >
            <NavLink to="/products" style={linkStyle}>
                Products
            </NavLink>

            <NavLink to="/cart" style={linkStyle}>
                Cart {cartCount}
            </NavLink>
        </div>
    );
}