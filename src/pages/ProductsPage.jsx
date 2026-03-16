export function ProductsPage({children}){
    // ตอนนี้เรายังไม่ย้าย logic เข้า page
    // เราใช้ children เพื่อไห้เราย้ายทีละขั้นแบบไม่พัง
    return (
        <div>
            <h2 style={{marginTop: 0}}>Products</h2>
            {children}
        </div>
    );
}