export function formatCurrency(value){
    const n = typeof value === "number" ? value : Number(value);
    if(Number.isNaN(n)) return "-"
    return new Intl.NumberFormat("th-TH",{
        style: "currency",
        currency: "THB",
        maximumFactionDigits: 0,
    }).format(n)
}