import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface NavItemProps {
    to: string;
    icon: LucideIcon;
    label: string;
}

export const NavItem = ({ to, icon: Icon, label }: NavItemProps) => (
    <NavLink to={to} end={to === '/'} className={({ isActive }) =>
        `flex flex-col lg:flex-row items-center gap-1.5 lg:gap-3 text-xs lg:text-base
         px-5 lg:px-6 py-2 lg:py-3 rounded-2xl transition-all duration-300 ease-in-out
         ${isActive ? 'bg-primary/30 shadow-lg text-[#003d9b]' : 'hover:bg-primary/30 hover:shadow-lg hover:text-[#003d9b]'}`
    }>
        <Icon size={22} strokeWidth={2} />
        <span className="font-bold">{label}</span>
    </NavLink>
);