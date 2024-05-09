import { NavLink } from "react-router-dom";
import useScan from "../hooks/useScan";
import useAuth from "../hooks/useAuth";

function MyNavLink({ to, showFor, children }) {
    const { isScanning } = useScan();
    const { auth } = useAuth();

    return (
        (showFor == null || auth?.roles?.find((role) => showFor?.includes(role))) && (
            <NavLink
                to={isScanning ? "#" : to} // Disable navigation when scanning
                className={({ isActive }) =>
                    `btn py-2 px-4 font-normal btn-ghost
                        ${isActive & !isScanning
                        ? "text-secondary-content"
                        : isScanning
                            ? "text-base-300 cursor-not-allowed btn-disabled "
                            : "text-base-content"
                    }
`
                }
                onClick={(e) => isScanning && e.preventDefault()} // Prevent navigation
            >
                <p className="text-center">{children}</p>
            </NavLink>
        )
    );
}

export default MyNavLink;
