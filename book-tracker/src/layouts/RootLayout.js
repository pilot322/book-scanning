import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/Sidebar";
import Login from "../pages/Login";

export default function RootLayout() {
    return (
        <div className="root-layout">
            <Header />
            <div className="flex">
                <Sidebar />
                <main className="h-screen w-screen m-5">
                    <Outlet />
                </main>
            </div >
        </div >
    );
}