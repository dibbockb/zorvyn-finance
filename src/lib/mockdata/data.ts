export const SUMMARY_STATS = {
    totalBalance: 45230.12,
    monthlyIncome: 8200.00,
    monthlyExpenses: 7450.50,
    netCashflow: 48229.40,
    savingsRate: 15,
    projectedBalance: 48000,
};
export const MONTHLY_COMPARISON = [
    { month: 'Jan', income: 7500, expenses: 3200 },
    { month: 'Feb', income: 7800, expenses: 3100 },
    { month: 'Mar', income: 8100, expenses: 3500 },
    { month: 'Apr', income: 8200, expenses: 3450 },
    { month: 'May', income: 7900, expenses: 3800 },
    { month: 'Jun', income: 8400, expenses: 3200 },
];

export const SPENDING_BREAKDOWN = [
    { category: 'Housing', value: 42, color: '#0047AB' },
    { category: 'Food & Beverage', value: 28, color: '#006B3C' },
    { category: 'Transport', value: 15, color: '#C41E3A' },
    { category: 'Entertainment', value: 15, color: '#666666' },
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
        id: 'tx-001',
        date: '05 Apr',
        amount: 3509,
        category: 'Technology',
        type: 'Expense',
        description: 'Notion Business Plan - Annual (renewal)',
        status: 'Completed'
    },
    {
        id: 'tx-002',
        date: '04 Apr',
        amount: 12450.00,
        category: 'Income',
        type: 'Income',
        description: 'Client Payment - Acme Corp (Project Milestone #2)',
        status: 'Completed'
    },
    {
        id: 'tx-003',
        date: '03 Apr',
        amount: 1850.00,
        category: 'Transport',
        type: 'Expense',
        description: 'Meta Ads Campaign - Q2 Lead Generation (mid-month)',
        status: 'Completed'
    },
    {
        id: 'tx-004',
        date: '03 Apr',
        amount: 8750.00,
        category: 'Income',
        type: 'Income',
        description: 'Stripe Payout - SaaS Subscription Revenue',
        status: 'Completed'
    },
    {
        id: 'tx-005',
        date: '02 Apr',
        amount: 420.00,
        category: 'Transport',
        type: 'Expense',
        description: 'Flight - SFO to NYC (Client Pitch Meeting)',
        status: 'Completed'
    },
    {
        id: 'tx-006',
        date: '01 Apr',
        amount: 3200.00,
        category: 'Income',
        type: 'Income',
        description: 'Retainer Fee - Vertex Solutions (April)',
        status: 'Completed'
    },
    {
        id: 'tx-007',
        date: '31 Mar',
        amount: 199.00,
        category: 'Technology',
        type: 'Expense',
        description: 'Figma Professional - Team License (annual)',
        status: 'Completed'
    },
    {
        id: 'tx-008',
        date: '30 Mar',
        amount: 2850.00,
        category: 'Income',
        type: 'Income',
        description: 'Invoice Payment #INV-3921 - Lumora Inc.',
        status: 'Completed'
    },
    {
        id: 'tx-009',
        date: '29 Mar',
        amount: 275.00,
        category: 'Transport',
        type: 'Expense',
        description: 'Office Supplies & Equipment (Staples - printer ink, paper, misc)',
        status: 'Completed'
    },
    {
        id: 'tx-010',
        date: '28 Mar',
        amount: 15200.00,
        category: 'Income',
        type: 'Income',
        description: 'Project Completion Payment - Fluxypy',
        status: 'Completed'
    },
    {
        id: 'tx-011',
        date: '27 Mar',
        amount: 89.99,
        category: 'Technology',
        type: 'Expense',
        description: 'Zoom Pro Annual Subscription',
        status: 'Completed'
    },
    {
        id: 'tx-012',
        date: '26 Mar',
        amount: 1240.00,
        category: 'Transport',
        type: 'Expense',
        description: 'Google Ads - Search Campaign (March)',
        status: 'Completed'
    },
    {
        id: 'tx-013',
        date: '25 Mar',
        amount: 450.00,
        category: 'Transport',
        type: 'Expense',
        description: 'Client Dinner - The Capital Grille (NYC pitch follow-up)',
        status: 'Completed'
    },
    {
        id: 'tx-014',
        date: '24 Mar',
        amount: 6200.00,
        category: 'Income',
        type: 'Income',
        description: 'Bank Transfer - Freelance Contract (Q1 Final)',
        status: 'Completed'
    },
    {
        id: 'tx-015',
        date: '23 Mar',
        amount: 125.00,
        category: 'Transport',
        type: 'Expense',
        description: 'Legal Consultation - Contract Review',
        status: 'Completed'
    },
    {
        id: 'tx-016',
        date: '22 Mar',
        amount: 299.00,
        category: 'Technology',
        type: 'Expense',
        description: 'Salesforce Starter Suite - Monthly (3 users)',
        status: 'Completed'
    },
    {
        id: 'tx-017',
        date: '20 Mar',
        amount: 9800.00,
        category: 'Income',
        type: 'Income',
        description: 'Milestone Payment - Apex Dynamics (Web App Phase 1)',
        status: 'Completed'
    },
    {
        id: 'tx-018',
        date: '18 Mar',
        amount: 65.00,
        category: 'Transport',
        type: 'Expense',
        description: 'Internet & Phone Bill (Business Line)',
        status: 'Completed'
    },
    {
        id: 'tx-019',
        date: '17 Mar',
        amount: 4500.00,
        category: 'Income',
        type: 'Income',
        description: 'Retainer - Horizon Creative (March)',
        status: 'Completed'
    },
    {
        id: 'tx-020',
        date: '15 Mar',
        amount: 189.00,
        category: 'Technology',
        type: 'Expense',
        description: 'Adobe Creative Cloud - Monthly',
        status: 'Completed'
    },
    {
        id: 'tx-021',
        date: '14 Mar',
        amount: 12400.00,
        category: 'Income',
        type: 'Income',
        description: 'Client Payment - Acme Corp (Project Milestone #1)',
        status: 'Completed'
    },
    {
        id: 'tx-022',
        date: '12 Mar',
        amount: 220.00,
        category: 'Transport',
        type: 'Expense',
        description: 'Uber/Lyft - Airport & Client Meetings (NYC)',
        status: 'Completed'
    },
    {
        id: 'tx-023',
        date: '10 Mar',
        amount: 1450.00,
        category: 'Transport',
        type: 'Expense',
        description: 'LinkedIn Ads - B2B Lead Generation',
        status: 'Completed'
    },
    {
        id: 'tx-024',
        date: '08 Mar',
        amount: 75.50,
        category: 'Transport',
        type: 'Expense',
        description: 'Wire Transfer & Payment Processing Fees',
        status: 'Completed'
    },
    {
        id: 'tx-025',
        date: '07 Mar',
        amount: 6200.00,
        category: 'Income',
        type: 'Income',
        description: 'Bank Transfer - Freelance Contract (Q1)',
        status: 'Completed'
    },
    {
        id: 'tx-026',
        date: '05 Mar',
        amount: 350.00,
        category: 'Transport',
        type: 'Expense',
        description: 'Team Lunch - Strategy Meeting',
        status: 'Completed'
    },
    {
        id: 'tx-027',
        date: '03 Mar',
        amount: 899.00,
        category: 'Technology',
        type: 'Expense',
        description: 'Notion Business Plan - Annual (prorated or add-on)',
        status: 'Completed'
    },
    {
        id: 'tx-028',
        date: '02 Mar',
        amount: 2850.00,
        category: 'Income',
        type: 'Income',
        description: 'Invoice Payment - Lumora Inc. (Partial)',
        status: 'Pending'
    },
    {
        id: 'tx-029',
        date: '01 Mar',
        amount: 120.00,
        category: 'Housing',
        type: 'Expense',
        description: 'Miscellaneous Office Supplies (Amazon)',
        status: 'Completed'
    }
];