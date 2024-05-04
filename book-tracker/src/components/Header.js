import React from "react";
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header className="bg-white shadow flex justify-between p-4">
            <p>Book Tracking</p>
            <nav>
                <ul className="flex space-x-4">
                    <NavLink to="/">Home</NavLink >
                    <NavLink to="/view">View</NavLink >
                    <NavLink to="/stats">Statistics</NavLink >
                </ul>
            </nav>
            <div className="flex items-center">
                <button className="icon-button">🔔</button>
                <img src="/user-avatar.png" alt="User" className="rounded-full w-8 h-8" />
                <span>John Doe</span>
                <button className="btn ml-4">Logout</button>
            </div>
        </header>
    );
}