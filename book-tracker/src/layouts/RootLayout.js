import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/Sidebar";
import Login from "../pages/Login";

export default function RootLayout() {
    return (
        <div className="root-layout">
            <Header />
            <div className="flex w-full">
                <Sidebar />
                <main className="h-full w-full mt-4 ml-6">
                    <Outlet />
                </main>
            </div >
        </div >
    );
}