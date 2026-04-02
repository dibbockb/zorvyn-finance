import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Dashboard from './Components/Dashboard/Dashboard.tsx';
import Rootlayout from './Components/Layouts/Dashboard/RootLayout.tsx';
import Transactions from './Components/Transactions/Transactions.tsx';
import Insights from './Components/Insights/Insights.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    children:
      [{ index: true, element: <Dashboard />, },
      { path: "transactions", element: <Transactions />, },
      { path: "insights", element: <Insights />, },
      ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
