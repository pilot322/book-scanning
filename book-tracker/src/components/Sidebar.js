import React from "react";
import MyNavLink from "./MyNavLink";

export default function Sidebar() {
    return (
        <aside className="bg-primary-content shadow p-4 h-screen w-60">
            <ul className="flex flex-col space-y-2">
                <MyNavLink showFor="manager" to="/receive">
                    Παραλαβή
                </MyNavLink >

                <MyNavLink to="/scan">
                    Σάρωση
                </MyNavLink >
            </ul>
        </aside>
    );
}