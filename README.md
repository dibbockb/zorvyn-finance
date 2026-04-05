# Zorvyn Finance Dashboard

A personal finance dashboard for tracking income, expenses, and spending patterns. Built with React, Tailwind and Zustand.

**Live:** [https://zorvyn.dibbockb.com](https://zorvyn.dibbockb.com)

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v4 + shadcn |
| State | Zustand with `persist` middleware |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Routing | React Router |
| Build | Vite |

---

## Setup

```bash
git clone https://github.com/dibbockb/zorvyn-finance
cd zorvyn-finance

pnpm install

pnpm run dev

pnpm run build
```

Runs on `http://localhost:5173` by default.

---

## Project Structure

```
src/
├── Components/
│   ├── AddTransactionModal/   # Form modal for adding transactions
│   ├── Charts/                # BalanceChart, SpendingBreakdown, RecentTransactions
│   ├── Dashboard/             # Main dashboard layout, Navbar, Cards, StatCards
│   ├── Insights/              # Insights page (stub)
│   ├── Layouts/               # RootLayout with sidebar nav
│   ├── TransactionsList/      # Full transactions page with filters
│   └── ui/                    # shadcn/ui primitives (Button, Dialog, Input, etc.)
├── lib/
│   ├── mockdata/data.ts       # Seed transactions and summary stats
│   └── utils/                 # cn() utility, CSV export
├── store/
│   └── useStore.ts            # Zustand store + selectTotals selector
└── main.tsx                   # Router setup
```

---

## Features

### Balance Trend Chart
Area chart showing portfolio balance over 7 days, 15 days, or 1 month. Powered by Recharts with a custom gradient fill.


### Add Transaction
Modal form with full validation via Zod. Fields: description, amount (USD), type (Income/Expense), category, and date. On submit, the transaction is prepended to the store and persisted to `localStorage`.

### CSV Export
Admin-only button that exports the full transaction list as a `.csv` file using a native Blob download.

### Role Toggle
Switch between User and Admin roles. Admin unlocks the Add Transaction button and CSV export. Purely UI-level access control — no auth backend.

## State & Persistence

State lives in a single Zustand store (`useStore`). The `persist` middleware serializes state to `localStorage` under the key `zustand-`, so transactions survive page refreshes.

The `selectTotals` selector computes income, expenses, and balance from the live transaction array — no derived state stored separately.

---
