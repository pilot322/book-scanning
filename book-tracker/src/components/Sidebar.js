import React from "react";
import MyNavLink from "./MyNavLink";

export default function Sidebar() {
    return (
        <aside className="bg-base-100 shadow p-4 h-dvh min-w-64">
            <ul className="flex flex-col space-y-2">
                <MyNavLink showFor={["manager"]} to="/receive">
                    Παραλαβή
                </MyNavLink >

                <MyNavLink to="/scan">
                    Σάρωση
                </MyNavLink >

                <MyNavLink to="/correct">
                    Διόρθωση
                </MyNavLink >

                <MyNavLink to="/quality-check">
                    Έλεγχος ποιότητας
                </MyNavLink >

                <MyNavLink to="/thumbs" showFor={["manager", "admin"]}>
                    Thumbs
                </MyNavLink >

                <MyNavLink to="/processing" showFor={["manager, admin"]}>
                    Processing
                </MyNavLink >

                <MyNavLink to="/crop" showFor={["manager, admin"]}>
                    Crop
                </MyNavLink >
            </ul>
        </aside>
    );
}