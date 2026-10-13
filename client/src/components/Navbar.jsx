
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const linkClass = ({ isActive }) =>
        `rounded-xl px-3 py-2 text-sm font-semibold transition ${
            isActive
                ? "bg-violet-100 text-violet-700"
                : "text-slate-600 hover:bg-fuchsia-50 hover:text-fuchsia-700"
        }`;

    return (
        <nav className="sticky top-0 z-50 border-b border-violet-100 bg-white/90 shadow-sm backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-8">
                <Link to="/books" className="flex shrink-0 items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xl text-white shadow-lg shadow-violet-500/25">
                        📚
                    </span>

                    <span className="text-xl font-extrabold tracking-tight text-slate-900">
                        Book
                        <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                            Nest
                        </span>
                    </span>
                </Link>

                <div className="flex items-center gap-1 sm:gap-3">
                    {user ? (
                        <>
                            <NavLink to="/books" className={linkClass}>
                                Explore
                            </NavLink>

                            <NavLink to="/my-reviews" className={linkClass}>
                                My Reviews
                            </NavLink>

                            <NavLink to="/books/add" className={linkClass}>
                                + Add Book
                            </NavLink>

                            <span className="hidden rounded-xl bg-purple-50 px-3 py-2 text-sm font-medium text-purple-700 md:block">
                                Hi, {user.name}
                            </span>

                            <button
                                onClick={handleLogout}
                                className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-2 text-sm font-bold text-white shadow-md shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-lg sm:px-4"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={linkClass}>
                                Login
                            </NavLink>

                            <Link
                                to="/register"
                                className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-2 text-sm font-bold text-white shadow-md shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-lg sm:px-4"
                            >
                                Join Us <span className="hidden sm:inline">↗</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
