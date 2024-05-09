import React from "react";
import MyNavLink from "./MyNavLink";

export default function Sidebar() {
    return (
        <aside className="bg-base-100 shadow p-4 h-dvh min-w-64">
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