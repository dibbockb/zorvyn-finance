import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BALANCE_TREND } from '../../../public/data/mockdata/data';
import { useState } from 'react';

const BalanceTrend = () => {
    const periods = ['7D', '15D', '1M'] as const;
    type Period = typeof periods[number];
    const [activePeriod, setActivePeriod] = useState<Period>('7D');

    return (
        <div className="bg-white p-4 lg:p-8 rounded-2xl shadow-sm border border-secondary/5 h-full flex flex-col">
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
                    <AreaChart data={BALANCE_TREND[activePeriod]}>
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
                        <YAxis hide />   {/* Simplified for now */}
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
                            dot={{ r: 4, fill: '#0047AB', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            
        </div>
    );
};

export default BalanceTrend;