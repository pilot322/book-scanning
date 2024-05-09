import React from "react";
import MyNavLink from "../MyNavLink";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const { auth } = useAuth();
    const navigate = useNavigate();
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
                        <MyNavLink to="/actionlog" showFor={"admin"}>
                            Δράσεις
                        </MyNavLink >
                        <MyNavLink to="/stats">
                            Στατιστικά
                        </MyNavLink >
                    </ul>
                </nav>
                <div className="flex items-center">
                    <button className="btn btn-ghost btn-circle mr-4" onClick={(e) => navigate('/notifications')}>
                        <svg className="h-6 w-6 secondary-content-fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" /></svg>
                    </button>
                    {/*<img src="/user-avatar.png" alt="User" className="rounded-full w-8 h-8" />*/}
                    <span className="mr-8 font-bold text-secondary-content">{auth.user}</span>
                    {/* <button className="btn btn-ghost text-error btn-error ml-4">Αποσύνδεση</button> */}
                </div>
            </div>
        </header>
    );
}