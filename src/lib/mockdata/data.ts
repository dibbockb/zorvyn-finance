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

export const RECENT_TRANSACTIONS: Transaction[] = [
    {
        id: 'tx-008',
        date: '04 Apr',
        amount: 899.00,
        category: 'Technology',
        type: 'Expense',
        description: 'Notion Business Plan - Annual',
        status: 'Completed'
    },
    {
        id: 'tx-009',
        date: '04 Apr',
        amount: 12400.00,
        category: 'Income',
        type: 'Income',
        description: 'Client Payment - Acme Corp (Project Milestone)',
        status: 'Completed'
    },
    {
        id: 'tx-010',
        date: '03 Apr',
        amount: 1240.50,
        category: 'Technology',
        type: 'Expense',
        description: 'Meta Ads Campaign - Q2 Lead Generation',
        status: 'Completed'
    },
    {
        id: 'tx-011',
        date: '03 Apr',
        amount: 8750.00,
        category: 'Income',
        type: 'Income',
        description: 'Stripe Payout - SaaS Subscriptions',
        status: 'Completed'
    },
    {
        id: 'tx-012',
        date: '02 Apr',
        amount: 320.00,
        category: 'Transport',
        type: 'Expense',
        description: 'Flight - SFO to NYC (Client Pitch)',
        status: 'Completed'
    },
    {
        id: 'tx-013',
        date: '02 Apr',
        amount: 4500.00,
        category: 'Income',
        type: 'Income',
        description: 'Retainer Fee - Vertex Solutions',
        status: 'Completed'
    },
    {
        id: 'tx-014',
        date: '01 Apr',
        amount: 189.99,
        category: 'Technology',
        type: 'Expense',
        description: 'Figma Professional - Team License',
        status: 'Completed'
    },
    {
        id: 'tx-015',
        date: '01 Apr',
        amount: 2850.00,
        category: 'Income',
        type: 'Income',
        description: 'Invoice Payment #INV-3921 - Lumora Inc.',
        status: 'Completed'
    },
    {
        id: 'tx-016',
        date: '31 Mar',
        amount: 450.00,
        category: 'Housing',
        type: 'Expense',
        description: 'Office Supplies & Equipment (Staples)',
        status: 'Completed'
    },
    {
        id: 'tx-017',
        date: '31 Mar',
        amount: 15200.00,
        category: 'Income',
        type: 'Income',
        description: 'Project Completion Payment - Fluxypy',
        status: 'Completed'
    },
    {
        id: 'tx-018',
        date: '30 Mar',
        amount: 2750.00,
        category: 'Technology',
        type: 'Expense',
        description: 'Salesforce Enterprise - Monthly',
        status: 'Completed'
    },
    {
        id: 'tx-019',
        date: '29 Mar',
        amount: 680.75,
        category: 'Housing',
        type: 'Expense',
        description: 'Legal Consultation - Contract Review',
        status: 'Completed'
    },
    {
        id: 'tx-020',
        date: '28 Mar',
        amount: 95.00,
        category: 'Food',
        type: 'Expense',
        description: 'Client Dinner - The Capital Grille',
        status: 'Completed'
    },
    {
        id: 'tx-021',
        date: '28 Mar',
        amount: 6200.00,
        category: 'Income',
        type: 'Income',
        description: 'Bank Transfer - Freelance Contract (Q1)',
        status: 'Completed'
    }
];