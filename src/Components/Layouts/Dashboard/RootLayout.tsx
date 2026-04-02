import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageCircleQuestionMark, NotebookTabs, UserRoundCog, WandSparkles } from 'lucide-react';

export default function RootLayout() {
    return (
        <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
            <aside className="lg:w-72 flex  bg-[#f1f3ff] text-white lg:p-4 shadow-2xl justify-center lg:justify-start
            fixed bottom-0 left-0 right-0 lg:relative lg:flex-col">
                <a href="https://zorvyn.io/" target='_blank' className="hidden lg:block">
                    <img src="public\logo.png" alt="navbar-logo" className="h-15 mx-auto px-6 my-3" />
                    <p className="text-primary leading-7 max-w-35 text-center mx-auto text-2xl font-bold">Zorvyn Finance</p>
                </a>

                <nav className="flex flex-row py-4 lg:flex-col gap-3 text-[#5c5e6a] lg:pt-12 ">
                    <NavLink to="/" className={({ isActive }) =>
                        `flex flex-col lg:flex-row items-center gap-1.5 lg:gap-3 text-xs lg:text-base
                             px-5 lg:px-6 py-2 lg:py-3 rounded-xl transition-all duration-300 ease-in-out
                             ${isActive
                            ? 'bg-primary/30 shadow-lg text-[#003d9b]'
                            : 'hover:bg-primary/30 hover:shadow-lg hover:text-[#003d9b]'
                        }`
                    }
                    >
                        <LayoutDashboard size={22} strokeWidth={2} />
                        <p className="lg:block lg:text-16px inter aside-button ">Overview</p>
                    </NavLink>

                    <NavLink to="/transactions"
                        className={({ isActive }) =>
                            `flex flex-col lg:flex-row items-center gap-1.5 lg:gap-3 text-xs lg:text-base
                             px-5 lg:px-6 py-2 lg:py-3 rounded-xl transition-all duration-300 ease-in-out
                             ${isActive
                                ? 'bg-primary/30 shadow-lg text-[#003d9b]'
                                : 'hover:bg-primary/30 hover:shadow-lg hover:text-[#003d9b]'
                            }`
                        }
                    >
                        <NotebookTabs size={22} strokeWidth={2} />
                        <p className=" lg:block inter aside-button ">Transactions</p>
                    </NavLink>

                    <NavLink to="/insights" className={({ isActive }) =>
                        `flex flex-col lg:flex-row items-center gap-1.5 lg:gap-3 text-xs lg:text-base
                             px-5 lg:px-6 py-2 lg:py-3 rounded-xl transition-all duration-300 ease-in-out
                             ${isActive
                            ? 'bg-primary/30 shadow-lg text-[#003d9b]'
                            : 'hover:bg-primary/30 hover:shadow-lg hover:text-[#003d9b]'
                        }`
                    }
                    >
                        <WandSparkles size={22} strokeWidth={2} />
                        <p className=" lg:block inter aside-button ">Insights</p>
                    </NavLink>
                </nav>


                <nav className="hidden lg:flex flex-col text-[#5c5e6a] border-t border-t-neutral-400/50 mt-auto">
                    <NavLink to="/settings" className="flex items-center gap-1 px-6 py-3 rounded-xl transition-all duration-300 ease-in-out">
                        <UserRoundCog size={22} strokeWidth={2} />
                        <p className=" lg:block inter aside-button ">Settings</p>
                    </NavLink>
                    <NavLink to="/support" className="flex items-center gap-1 px-6 py-3 rounded-xl transition-all duration-300 ease-in-out">
                        <MessageCircleQuestionMark size={22} strokeWidth={2} />
                        <p className=" lg:block inter aside-button ">Support</p>
                    </NavLink>
                </nav>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}