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
import NotFound from './pages/NotFound';
// layouts
import RootLayout from './layouts/RootLayout';


// orizw routes sto browser router
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route path="receive" element={<ReceivePage />} />
            <Route path="scan" element={<ScanPage />} />
            <Route path="correct" element={<CorrectPage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="view" element={<View />} />
            <Route path="stats" element={<Statistics />} />
            <Route path="login" element={<Login />} />
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />}></Route>
        </Route>
    )
);

function App() {
    return (
        <RouterProvider router={router} />
    );
}


export default App;