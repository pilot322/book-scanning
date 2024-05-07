import React from 'react';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';  // This will include Header, Navbar, and Sidebar
import ReceivePage from "./pages/receivePages/ReceivePage";
import ScanPage from "./pages/scanPages/ScanPage";
import Dashboard from "./pages/Dashboard";
import View from './pages/View';
import Statistics from './pages/Statistics';

import RequireAuth from './components/RequireAuth';
import NotFound from './pages/NotFound';
import ScanSessionPage from './pages/scanPages/ScanSessionPage';


import RequireNotInSession from './components/RequireNotInSession';

// layouts
import RootLayout from './layouts/RootLayout';


// orizw routes sto browser router
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            {/* public routes */}
            <Route path="login" element={<Login />} />


            <Route element={<RequireAuth allowedRoles={['scanner', 'manager', 'admin']} />}>
                <Route path="scan/session" element={<ScanSessionPage />} />
            </Route>

            {/* protected routes */}
            <Route element={<RequireNotInSession />}>
                <Route element={<RequireAuth allowedRoles={['scanner', 'manager', 'admin']} />}>
                    <Route index element={<Home />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="scan" element={<ScanPage />} />
                    <Route path="view" element={<View />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={['manager', 'admin']} />}>

                    <Route path="receive" element={<ReceivePage />} />
                    <Route path="stats" element={<Statistics />} />

                </Route>
            </Route>
            {/* not found */}
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

export default function App() {
    return (
        <RouterProvider router={router} />
    );
}

