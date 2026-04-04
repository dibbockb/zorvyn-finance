export const SUMMARY_STATS = {
    totalBalance: 45230.12,
    monthlyIncome: 8200.00,
    monthlyExpenses: 7450.50,
    netCashflow: 48229.40,
    savingsRate: 15,
    projectedBalance: 48000,
};

export const BALANCE_TREND = {
    '7D': [
        { date: '29 Mar', balance: 47850 },
        { date: '30 Mar', balance: 48520 },
        { date: '31 Mar', balance: 49210 },
        { date: '01 Apr', balance: 49870 },
        { date: '02 Apr', balance: 50340 },
        { date: '03 Apr', balance: 49780 },
        { date: '04 Apr', balance: 51000 },
    ],
    '15D': [
        { date: '21 Mar', balance: 46120 },
        { date: '22 Mar', balance: 45580 },
        { date: '23 Mar', balance: 46890 },
        { date: '24 Mar', balance: 47430 },
        { date: '25 Mar', balance: 48150 },
        { date: '26 Mar', balance: 47760 },
        { date: '27 Mar', balance: 48340 },
        { date: '28 Mar', balance: 47990 },
        { date: '29 Mar', balance: 47850 },
        { date: '30 Mar', balance: 48520 },
        { date: '31 Mar', balance: 49210 },
        { date: '01 Apr', balance: 49870 },
        { date: '02 Apr', balance: 50340 },
        { date: '03 Apr', balance: 49780 },
        { date: '04 Apr', balance: 51000 },
    ],
    '1M': [
        { date: '04 Mar', balance: 41230 },
        { date: '06 Mar', balance: 42890 },
        { date: '08 Mar', balance: 43560 },
        { date: '10 Mar', balance: 44970 },
        { date: '12 Mar', balance: 45820 },
        { date: '14 Mar', balance: 47210 },
        { date: '16 Mar', balance: 48140 },
        { date: '18 Mar', balance: 47680 },
        { date: '20 Mar', balance: 48950 },
        { date: '22 Mar', balance: 45580 },
        { date: '23 Mar', balance: 46890 },
        { date: '24 Mar', balance: 47430 },
        { date: '25 Mar', balance: 48150 },
        { date: '26 Mar', balance: 47760 },
        { date: '27 Mar', balance: 48340 },
        { date: '28 Mar', balance: 47990 },
        { date: '29 Mar', balance: 47850 },
        { date: '30 Mar', balance: 48520 },
        { date: '31 Mar', balance: 49210 },
        { date: '01 Apr', balance: 49870 },
        { date: '02 Apr', balance: 50340 },
        { date: '03 Apr', balance: 49780 },
        { date: '04 Apr', balance: 51000 },
    ],
};

export const SPENDING_BREAKDOWN = [
    { category: 'Housing', value: 42, color: '#0047AB' },
    { category: 'Food & Beverage', value: 28, color: '#006B3C' },
    { category: 'Transport', value: 15, color: '#C41E3A' },
    { category: 'Entertainment', value: 15, color: '#666666' },
];

export const MONTHLY_COMPARISON = [
    { month: 'Jan', income: 7500, expenses: 3200 },
    { month: 'Feb', income: 7800, expenses: 3100 },
    { month: 'Mar', income: 8100, expenses: 3500 },
    { month: 'Apr', income: 8200, expenses: 3450 },
];

export type Role = 'Admin' | 'User';

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    category: 'Food' | 'Housing' | 'Technology' | 'Income' | 'Transport' | 'Entertainment';
    type: 'Income' | 'Expense';
    description: string;
    status: 'Completed' | 'Pending';
}

export const INSIGHTS = [
    {
        id: 'i1',
        title: 'Dining Out Alert',
        description: 'Your spending on Dining Out increased by 20% this week.',
        type: 'warning',
    },
    {
        id: 'i2',
        title: 'Optimization Opportunity',
        description: 'Your subscription to "StreamCloud" hasn\'t been used in 30 days.',
        type: 'info',
    },
];