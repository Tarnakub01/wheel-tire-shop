export function FilterBar({
    query,
    onQuerychange,
    category,
    onCategoryChange,
    sort,
    onSortChange,
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
            gridTemplateColumns: "1fr 200px 200px",
            alignItems: "center",
        }}
        >
            {/*Search*/}
            <div>
                <div style={{fontSize: 12, marginBottom: 4 }}>Search</div>
                <input
                value={query}
                onChange={(e)=> onQuerychange(e.target.value)}
                placeholder="Search products"
                style={{width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc"}}
                />
            </div>

            {/*Category*/}
            <div>
                <div style={{fontSize: 12, marginBottom: 4 }}>Category</div>
                <select
                value={category}
                onChange={(e)=> onCategoryChange(e.target.value)}
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
        </div>
    );
}