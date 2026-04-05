export const exportToCSV = (data: any[]) => {
    if (data.length === 0) { return; }

    const headers = ["Date", "Description", "Category", "Amount", "Type", "Status"];
    const csvContent = [headers.join(","),
    ...data.map(tx =>
        [`"${tx.date}, 2026"`,
        `"${tx.description}"`,
        `"${tx.category}"`,
        tx.amount,
        `"${tx.type}"`,
        `"${tx.status}"`].join(","))].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Zorvyn_ledger_${new Date().toISOString()}.csv`);
    link.click();
}