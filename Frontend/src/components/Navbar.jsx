import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

function Navbar() {
    const { authUser, signout } = useAuthStore();

    return (
        <header className="bg-gray-900/90 backdrop-blur-md fixed w-full top-0 z-50 border-b border-gray-700">
            <div className="container mx-auto px-6 h-16 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 transition-all hover:opacity-80">
                    <div className="p-2 bg-gray-800 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-blue-400" />
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-100">Chatify</h1>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-6">
                    <Link
                        to="/settings"
                        className="btn btn-sm flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-all"
                    >
                        <Settings className="w-5 h-5" />
                        <span className="hidden md:inline">Settings</span>
                    </Link>

                    {authUser && (
                        <>
                            <Link
                                to="/profile"
                                className="btn btn-sm flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-all"
                            >
                                <User className="size-5" />
                                <span className="hidden md:inline">{authUser.fullname}</span>
                            </Link>
                            <button
                                onClick={signout}
                                className="btn btn-sm flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-gray-800 rounded-lg transition-all"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="hidden md:inline">Signout</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;
