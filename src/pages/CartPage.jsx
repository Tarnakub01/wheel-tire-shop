// ทำไมใช้ children ก่อน?
// เพราะชั่วโมงนี้เราจะ “ตั้ง routing” ให้ทำงานก่อน แล้วชั่วโมงต่อไปค่อยย้าย content เข้า page ทีละก้อน (best practice แบบไม่พัง)
export function CartPage({children}){
    return (
        <div>
            <h2 style={{ marginTop:0}}>Cart</h2>
            {children}
        </div>
    )
}