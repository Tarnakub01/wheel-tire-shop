export function FilterBar({
    query,
    onQueryChange,
    category,
    onCategoryChange,
    sort,
    onSortChange,
    onClear,
}) {
    return (
        <div
        style={{
            marginBottom: 16,
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
            display: "grid",
            gap: 12,
            gridTemplateColumns: "1fr 200px 200px 120px",
            alignItems: "center",
        }}
        >
            {/*Search*/}
            <div>
                <div style={{fontSize: 12, marginBottom: 4 }}>Search</div>
                <input
                value={query}
                onChange={(e)=> onQueryChange(e.target.value)}
                placeholder="Search products"
                style={{width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc"}}
                />
            </div>

            {/*Category*/}
            <div>
                <div style={{fontSize: 12, marginBottom: 4 }}>Category</div>
                <select
                value={category}
                onChange={(e)=> onCategoryChange(e.target.value)} // ตามความเข้าใจก็คือ เหมือนเอา e มารอรับ ค่าที่ browser ส่งกลับมาไห้หรือการกระทำของ user แล้วมาเก็นไว้ที่ e จากนั้นส่ง e เข้าไปใน Fn แล้วดึงค่าที่ได้ออกมาจาก e 
                style={{width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc"}}
                >
                    <option value="all">All</option>
                    <option value="tire">Tire</option>
                    <option value="wheel">Wheel</option>
                </select>
            </div>
            {/* sort */}
            <div>
                <div style={{fontSize: 12, marginBottom: 4}}>Sort</div>
                <select 
                value={sort}
                onChange={(e)=> onSortChange(e.target.value)}
                style={{width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc"}}
                >
                    <option value="price_asc">Price: Low → High</option>
                    <option value="price_desc">Price: High → Low</option>
                </select>
            </div>

            <div style={{alignSelf: "end"}}>
                <button
                type="button"
                onClick={onClear}
                style={{width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc"}}
                >
                    Clear
                </button>
            </div>
        </div>
    );
}