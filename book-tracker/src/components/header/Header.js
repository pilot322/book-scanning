import React from "react";
import MyNavLink from "../MyNavLink";
import useAuth from "../../hooks/useAuth";

export default function Header() {
    const { auth } = useAuth();

    return (
        <header className="bg-base-100 shadow flex items-start justify-start h-20 pt-4 pl-5 w-full">
            <p className="text-3xl font-extrabold text-primary min-w-56 max-w-56 mr-3">Book Tracking</p>
            <div className="flex justify-between w-full">
                <nav>
                    <ul className="flex">
                        <MyNavLink to="/">
                            Αρχική
                        </MyNavLink >
                        <MyNavLink to="/view">
                            Αναζήτηση
                        </MyNavLink >
                        <MyNavLink to="/stats">
                            Στατιστικά
                        </MyNavLink >
                    </ul>
                </nav>
                <div className="flex items-center">
                    <button className="btn btn-ghost btn-circle mr-4">🔔</button>
                    {/*<img src="/user-avatar.png" alt="User" className="rounded-full w-8 h-8" />*/}
                    <span className="mr-8 text-secondary-content">{auth.user}</span>
                    {/* <button className="btn btn-ghost text-error btn-error ml-4">Αποσύνδεση</button> */}
                </div>
            </div>
        </header>
    );
}