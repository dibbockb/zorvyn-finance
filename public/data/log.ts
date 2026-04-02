export const SUMMARY_STATS = {
    totalBalance: 45230.12, // [cite: 10]
    monthlyIncome: 8200.00, // [cite: 13]
    monthlyExpenses: 3450.50, // [cite: 23]
    netCashflow: 48229.40, // [cite: 95]
    savingsRate: 15, // [cite: 15, 156]
    projectedBalance: 48000, // [cite: 158]
};

export const BALANCE_TREND = [
    { date: '01 Oct', balance: 35000 }, // [cite: 31]
    { date: '08 Oct', balance: 38000 }, // [cite: 32]
    { date: '15 Oct', balance: 41000 }, // [cite: 33]
    { date: '22 Oct', balance: 44000 }, // [cite: 34]
    { date: '30 Oct', balance: 45230 }, // [cite: 35]
];

export const SPENDING_BREAKDOWN = [
    { category: 'Housing', value: 42, color: '#0047AB' }, // [cite: 27, 28]
    { category: 'Food & Beverage', value: 28, color: '#006B3C' }, // [cite: 29, 30]
    { category: 'Transport', value: 15, color: '#C41E3A' }, // [cite: 36, 37]
    { category: 'Entertainment', value: 15, color: '#666666' }, // [cite: 38, 39]
];

export const MONTHLY_COMPARISON = [
    { month: 'Jan', income: 7500, expenses: 3200 }, // [cite: 161, 162, 163]
    { month: 'Feb', income: 7800, expenses: 3100 }, // [cite: 164]
    { month: 'Mar', income: 8100, expenses: 3500 }, // [cite: 165]
    { month: 'Apr', income: 8200, expenses: 3450 }, // [cite: 166]
];

export const TRANSACTIONS = [
    {
        id: 't1',
        date: 'Oct 24, 2024', // [cite: 41, 197]
        description: 'Apple Store Soho', // [cite: 198]
        category: 'Technology', // [cite: 131, 198]
        amount: -1299.00, // [cite: 198]
        type: 'Expense', // [cite: 131]
        status: 'Completed', // [cite: 234]
    },
    {
        id: 't2',
        date: 'Oct 23, 2024', // [cite: 199]
        description: 'Stripe Payout', // [cite: 198]
        category: 'Income', // [cite: 235]
        amount: 8450.00, // [cite: 198]
        type: 'Income', // [cite: 76]
        status: 'Completed', // [cite: 237]
    },
    {
        id: 't3',
        date: 'Oct 22, 2024', // [cite: 41]
        description: 'Whole Foods Market', // [cite: 41, 79]
        category: 'Food', // [cite: 41, 80]
        amount: -142.30, // [cite: 41]
        type: 'Expense', // [cite: 71, 81]
        status: 'Completed',
    },
    {
        id: 't4',
        date: 'Oct 20, 2024', // [cite: 41]
        description: 'Modern Realty Rent', // [cite: 41]
        category: 'Housing', // [cite: 41, 149]
        amount: -2150.00, // [cite: 41]
        type: 'Expense',
        status: 'Completed',
    },
];

export const INSIGHTS = [
    {
        id: 'i1',
        title: 'Dining Out Alert', // [cite: 181]
        description: 'Your spending on Dining Out increased by 20% this week.', // [cite: 181]
        type: 'warning',
    },
    {
        id: 'i2',
        title: 'Optimization Opportunity', // [cite: 256]
        description: 'Your subscription to "StreamCloud" hasn\'t been used in 30 days.', // [cite: 257]
        type: 'info',
    },
];