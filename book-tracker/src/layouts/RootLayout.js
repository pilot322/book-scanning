import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
    return (
        <div className="root-layout">
            <Header />
            <div className="flex">
                <Sidebar />
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}