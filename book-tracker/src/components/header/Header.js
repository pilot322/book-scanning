import React from "react";
import MyNavLink from "../MyNavLink";

export default function Header() {
    return (
        <header className="bg-primary-content shadow flex items-center justify-between p-4">
            <p className="text-4xl font-semibold text-primary w-64 space-x-4">Book Tracking</p>
            <nav>
                <ul className="flex space-x-4">
                    <MyNavLink to="/">
                        Αρχική
                    </MyNavLink >
                    <MyNavLink to="/view">
                        Όψη
                    </MyNavLink >
                    <MyNavLink to="/stats">
                        Στατιστικά
                    </MyNavLink >
                </ul>
            </nav>
            <div className="flex items-center space-x-4">
                <button className="icon-button">🔔</button>
                <img src="/user-avatar.png" alt="User" className="rounded-full w-8 h-8" />
                <span>John Doe</span>
                <button className="btn btn-warning ml-4">Αποσύνδεση</button>
            </div>
        </header>
    );
}