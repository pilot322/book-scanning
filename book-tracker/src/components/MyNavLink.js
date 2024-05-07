import { NavLink } from "react-router-dom";
import useScan from "../hooks/useScan";

function MyNavLink({ to, children }) {
    const { isScanning } = useScan();

    return (
        <NavLink
            to={isScanning ? "#" : to} // Disable navigation when scanning
            className={
                ({ isActive }) =>
                    `py-2 px-4 rounded-full
                    ${isActive
                        ? isScanning
                            ? "bg-secondary-content text-base-300 cursor-not-allowed"
                            : "font-extrabold bg-secondary text-amber-400"
                        : "font-semibold bg-secondary-content text-black"}
                    `
            }
            onClick={(e) => isScanning && e.preventDefault()} // Prevent navigation
        >
            <p className="text-center">{children}</p>
        </NavLink>
    );
}

export default MyNavLink;
