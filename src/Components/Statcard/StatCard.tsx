import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
    title: string;
    amount: number;
    type: 'balance' | 'income' | 'expense';
    percentage: number;
}

const StatCard = ({ title, amount, type, percentage }: StatCardProps) => {
    const formattedUSD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);

    const icons = {
        balance: <Wallet className="text-primary" size={20} />,
        income: <TrendingUp className="text-tertiary" size={20} />,
        expense: <TrendingDown className="text-red-500" size={20} />,
    };

    const bgColors = {
        balance: 'bg-primary/10',
        income: 'bg-tertiary/10',
        expense: 'bg-red-50',
    };

    return (
        <div className="bg-white p-4 lg:p-8 rounded-2xl shadow-sm border border-secondary/5 flex flex-col gap-4 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
                <div className={`p-3 rounded-xl ${bgColors[type]}`}>
                    {icons[type]}
                </div>
                {percentage !== undefined && (
                    <span className={`hidden lg:block px-2 py-1 rounded-lg text-sm font-bold ${percentage > 0 ? 'bg-tertiary/20 text-tertiary' : 'bg-red-100 text-red-600'}`}>
                        {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
                    </span>
                )}
            </div>

            <div>
                <p className="text-black/50 inter text-xs lg:text-base font-bold tracking-wider ">{title}</p>
                <h2 className="text-lg text-shadow-md lg:text-3xl text-black manrope mt-1 ">{formattedUSD}</h2>
            </div>

            <div className="mt-2 h-2 w-full bg-background rounded-full overflow-hidden ">
                <div
                    className={`h-full rounded-full ${type === 'balance' ? 'bg-primary' : type === 'income' ? 'bg-tertiary' : 'bg-red-400'}`}
                    style={{ width: '75%' }}
                />
            </div>
        </div>
    );
}

export default StatCard;