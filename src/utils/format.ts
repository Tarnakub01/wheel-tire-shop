export function formatCurrency(value: number | string): string{
    const n = typeof value === "number" ? value : Number(value);
    if(Number.isNaN(n)) return "-"
    return new Intl.NumberFormat("th-TH",{
        style: "currency",
        currency: "THB",
        maximumFractionDigits: 0,
    }).format(n)
}
