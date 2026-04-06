import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageCircleQuestionMark, NotebookTabs, UserRoundCog, WandSparkles } from 'lucide-react';
import { NavItem } from '../../Dashboard/NavItem';
import { motion } from "framer-motion"

export default function RootLayout() {
    return (
        <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
            <motion.aside
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 100 }}
                transition={{ duration: 0.8, ease: "easeIn" }}
                className="lg:w-72 flex  text-white lg:p-4  justify-center lg:justify-start lg:flex-col fixed bottom-0 left-0 right-0 z-50 bg-[#f1f3ff]  border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:relative lg:border-t-0 lg:shadow-2xl">
                <a href="https://zorvyn.org/" target='_blank' className="hidden lg:block">
                    <img src="logo.png" alt="navbar-logo" className="h-15 mx-auto px-6 my-3" />
                    <p className="text-primary leading-7 max-w-35 text-center mx-auto text-2xl font-bold">Zorvyn Finance</p>
                </a>

                <nav className="flex flex-row py-4 lg:flex-col gap-3 text-[#5c5e6a] lg:pt-12 ">
                    <NavItem to="/" icon={LayoutDashboard} label="Overview" />
                    <NavItem to="/transactions" icon={NotebookTabs} label="Transactions" />
                    <NavItem to="/insights" icon={WandSparkles} label="Insights" />
                </nav>


                <div className="hidden lg:flex flex-col text-[#5c5e6a] border-t border-t-neutral-400/50 mt-auto">
                    <NavLink to="/settings" className="flex items-center gap-1 px-6 py-3 rounded-2xl transition-all duration-300 ease-in-out">
                        <UserRoundCog size={22} strokeWidth={2} />
                        <p className=" lg:block inter  ">Settings</p>
                    </NavLink>
                    <NavLink to="/support" className="flex items-center gap-1 px-6 py-3 rounded-2xl transition-all duration-300 ease-in-out">
                        <MessageCircleQuestionMark size={22} strokeWidth={2} />
                        <p className=" lg:block inter  ">Support</p>
                    </NavLink>
                </div>
            </motion.aside>

            <main className="flex-1 lg:px-5 overflow-y-auto pb-24 lg:pb-0">
                <Outlet />
            </main>
        </div>
    );
}