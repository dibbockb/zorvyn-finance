import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useMemo } from 'react';
import { useStore } from '@/store/useStore';

const BalanceTrend = () => {
    const transactions = useStore((state) => state.transactions);

    type Period = typeof periods[number];
    const periods = ['7D', '15D', '1M'] as const;
    const [activePeriod, setActivePeriod] = useState<Period>('7D');

    const balanceTrendData = useMemo(() => {
        const parseDate = (dateStr: string) => {
            const [day, month] = dateStr.split(' ');
            const date = new Date(2026, new Date(`${month} 1`).getMonth(), parseInt(day));
            return date;
        };

        const getPeriodDays = (period: Period) => {
            return period === '7D' ? 7 : period === '15D' ? 15 : 30;
        };

        const periodDays = getPeriodDays(activePeriod);
        const endDate = new Date(); endDate.setHours(23, 59, 59, 999);
        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - periodDays);

        const sortedTx = [...transactions].sort((a, b) => {
            return parseDate(a.date).getTime() - parseDate(b.date).getTime();
        });

        const filteredTx = sortedTx.filter(tx => {
            const txDate = parseDate(tx.date);
            return txDate >= startDate && txDate <= endDate;
        });

        const currentBalance = transactions.reduce((acc, tx) => {
            return tx.type === 'Income' ? acc + tx.amount : acc - tx.amount;
        }, 0);

        const balanceByDate: { [key: string]: number } = {};
        const txBeforePeriod = sortedTx.filter(tx => parseDate(tx.date) < startDate);

        let adjustedBalance = currentBalance;
        txBeforePeriod.forEach(tx => {
            adjustedBalance -= (tx.type === 'Income' ? tx.amount : -tx.amount);
        });
        txBeforePeriod.forEach(tx => {
            adjustedBalance -= (tx.type === 'Income' ? tx.amount : -tx.amount);
        });

        filteredTx.forEach(tx => {
            const txDate = parseDate(tx.date);
            const dateKey = tx.date;
            if (!balanceByDate[dateKey]) {
                balanceByDate[dateKey] = adjustedBalance;
            }
            adjustedBalance += (tx.type === 'Income' ? tx.amount : -tx.amount);
            balanceByDate[dateKey] = adjustedBalance;
        });

        const chartData = [];
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const day = currentDate.getDate();
            const month = currentDate.toLocaleString('en-US', { month: 'short' });
            const dateStr = `${day.toString().padStart(2, '0')} ${month}`;
            const displayStr = `${day} ${month}`;

            let balance = adjustedBalance;
            for (const txDate in balanceByDate) {
                const tx = filteredTx.find(t => t.date === txDate);
                if (tx) {
                    const txDateObj = parseDate(txDate);
                    if (txDateObj <= currentDate) {
                        balance = balanceByDate[txDate];
                    }
                }
            }

            chartData.push({
                date: displayStr,
                balance: Math.round(balance * 100) / 100
            });

            currentDate.setDate(currentDate.getDate() + 1);
        }

        return chartData;
    }, [activePeriod, transactions]);

    return (
        <div className="bg-white p-4 lg:p-8 rounded-2xl h-full flex flex-col shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <div className="">
                    <h3 className="text-black font-bold text-sm  lg:text-2xl ">Balance Trend</h3>
                    <p className="hidden lg:block text-black/70 font-medium">Asset liquidity over 30 days</p>
                </div>

                <div className="flex bg-background p-1 rounded-lg gap-1 scale-90">
                    {periods.map((period) => (
                        <button
                            key={period}
                            onClick={() => setActivePeriod(period)}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-all duration-200 ${activePeriod === period
                                ? 'bg-white shadow-sm text-primary'
                                : 'text-neutral/40 hover:text-secondary'
                                }`}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 min-h-80 h-full">
                <ResponsiveContainer width="100%" height={320}>
                    <AreaChart data={balanceTrendData}>
                        <defs>
                            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0047AB" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#0047AB" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#434654', fontSize: 10, fontWeight: 700 }}
                            dy={10}
                        />
                        <YAxis hide />
                        <Tooltip
                            contentStyle={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="balance"
                            stroke="#0047AB"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorBalance)"
                            dot={{ r: 4, fill: '#0047AB', strokeWidth: 1, stroke: '#fff' }}
                            // activeDot={false}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>


        </div>
    );
};

export default BalanceTrend;