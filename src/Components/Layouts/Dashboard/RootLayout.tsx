import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, NotebookTabs, WandSparkles } from 'lucide-react';

export default function RootLayout() {
    return (
        <div className="flex h-screen">
            <aside className="lg:w-72 bg-[#f1f3ff] text-white p-4 shadow-2xl">

                <a href="https://zorvyn.io/" target='_blank' className="hidden lg:block">
                    <img src="public\zorvyn_logo.webp" alt="navbar-logo" className="h-15 mx-auto px-6 my-3" />
                    {/* <p className="text-black leading-5 max-w-35 text-center mx-auto">Track and Visualize all your finances!</p> */}
                </a>

                <nav className="flex flex-col gap-3 text-[#5c5e6a] lg:pt-8 ">
                    <NavLink to="/" className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ease-in-out
                            ${isActive
                            ? 'bg-white shadow-lg text-[#003d9b]'
                            : 'hover:bg-white hover:shadow-lg hover:text-[#003d9b]'
                        }`
                    }
                    >
                        <LayoutDashboard size={22} strokeWidth={2} />
                        <p className=" lg:block inter aside-button ">Overview</p>
                    </NavLink>

                    <NavLink to="/transactions"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ease-in-out
                                ${isActive
                                ? 'bg-white shadow-lg text-[#003d9b]'
                                : 'hover:bg-white hover:shadow-lg hover:text-[#003d9b]'
                            }`
                        }
                    >
                        <NotebookTabs size={22} strokeWidth={2} />
                        <p className=" lg:block inter aside-button ">Transactions</p>
                    </NavLink>

                    <NavLink to="/insights" className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ease-in-out
                            ${isActive
                            ? 'bg-white shadow-lg text-[#003d9b]'
                            : 'hover:bg-white hover:shadow-lg hover:text-[#003d9b]'
                        }`
                    }
                    >
                        <WandSparkles size={22} strokeWidth={2} />
                        <p className=" lg:block inter aside-button ">Insights</p>
                    </NavLink>
                </nav>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}