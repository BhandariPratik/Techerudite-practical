import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
    const { user, logout } = useAuth0();
    return (
        <header className="bg-amber-400 text-black p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Booking Management</h1>

                {user && (
                    <div className="flex items-center gap-4 bg-amber-50 p-2 rounded-lg shadow-md">
                        <img
                            src={user.picture}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
                            crossOrigin="anonymous"
                            referrerPolicy="no-referrer"
                        />
                        <span className="font-bold text-gray-900">{user.name?.toUpperCase()}</span>
                        <button
                            onClick={() => logout()}
                            className="cursor-pointer bg-red-600 px-4 py-1.5 rounded-md text-white font-semibold hover:bg-red-800 transition-all"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;

