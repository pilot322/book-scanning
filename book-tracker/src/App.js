import React from 'react';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';  // This will include Header, Navbar, and Sidebar
import ReceivePage from "./pages/ReceivePage";
import ScanPage from "./pages/ScanPage";
import CorrectPage from "./pages/CorrectPage";
import Dashboard from "./pages/Dashboard";
import View from './pages/View';
import Statistics from './pages/Statistics';

import RequireAuth from './components/RequireAuth';

import NotFound from './pages/NotFound';
// layouts
import RootLayout from './layouts/RootLayout';


// orizw routes sto browser router
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            {/* public routes */}
            <Route path="login" element={<Login />} />

            {/* protected routes */}
            <Route element={<RequireAuth />}>
                <Route index element={<Home />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="receive" element={<ReceivePage />} />
                <Route path="stats" element={<Statistics />} />
                <Route path="scan" element={<ScanPage />} />
                <Route path="correct" element={<CorrectPage />} />
            </Route>

            {/* not found */}
            < Route path="*" element={< NotFound />}></Route >
        </Route >
    )
);

export default function App() {
    return (
        <RouterProvider router={router} />
    );
}

