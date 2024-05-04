import React from "react";
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside className="bg-gray-100 p-4 outline outline-1">
            <ul className="flex flex-col space-y-2">
                <NavLink to="/receive"><button className="btn btn-block">Receive</button></NavLink>
                <NavLink to="/scan"><button className="btn btn-block">Scan</button></NavLink>
                <NavLink to="/correct"><button className="btn btn-block">Correct</button></NavLink>
            </ul>
        </aside>
    );
}