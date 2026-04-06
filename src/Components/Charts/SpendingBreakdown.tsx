import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { RECENT_TRANSACTIONS } from '../../lib/mockdata/data';
import { useMemo } from 'react';


const SpendingBreakdown = () => {
    const categoryColors: { [key: string]: string } = {
        Housing: '#0047AB',
        Food: '#006B3C',
        Transport: '#C41E3A',
        Entertainment: '#666666',
        Technology: '#8B5CF6',
    };

    const { breakdown, total } = useMemo(() => {
        const expensesByCategory: { [key: string]: number } = {};
        RECENT_TRANSACTIONS.forEach((tx) => {
            if (tx.type === 'Expense') {
                if (!expensesByCategory[tx.category]) {
                    expensesByCategory[tx.category] = 0;
                }
                expensesByCategory[tx.category] += tx.amount;
            }
        });

        const totalExpenses = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0);
        const breakdownData = Object.entries(expensesByCategory)
            .map(([category, amount]) => ({
                category,
                value: Math.round((amount / totalExpenses) * 100),
                amount,
                color: categoryColors[category] || '#999999',
            }))
            .sort((a, b) => b.amount - a.amount);

        return { breakdown: breakdownData, total: totalExpenses };
    }, []);

    return (
        <div className="bg-white p-4 lg:p-8 rounded-2xl shadow-sm h-full flex flex-col">
            <h3 className="text-black font-bold text-sm  lg:text-2xl mb-6">Spending Breakdown</h3>

            <div className="relative flex items-center justify-center" style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={breakdown}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-300}
                            strokeWidth={1}
                            stroke="#fff"
                        >
                            {breakdown.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>

                    </PieChart>
                </ResponsiveContainer>

                <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-black/50 text-xs font-semibold uppercase tracking-widest">Total</span>
                    <span className="text-black font-bold text-2xl">{`$${total.toFixed(2)}`}</span>
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
                {breakdown.map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-black/70 text-sm font-medium">{item.category}</span>
                        </div>
                        <span className="text-black font-bold text-sm">{item.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpendingBreakdown;