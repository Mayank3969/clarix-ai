
import React, { useState } from "react";
import { UserProfile, Notification } from "../types";
import { NotificationCenter } from "./NotificationCenter";
import { useAuth } from "../contexts/AuthContext";

interface HeaderProps {
  user: UserProfile;
  sidebarCollapsed: boolean;
  onNotificationClick: (notification: Notification) => void;
}

export const Header = ({ user, sidebarCollapsed, onNotificationClick }: HeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
      window.location.reload(); // Reload to reset state
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm transition-all duration-300">
      <div className="flex-1 max-w-2xl relative">
        <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input
          type="text"
          placeholder="Global Search..."
          className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        />
      </div>

      <div className="flex items-center gap-6 ml-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-full text-xs font-bold shadow-sm">
            <i className="fa-solid fa-trophy"></i>
            <span className="hidden md:inline">Rep: {user.reputation}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-xs font-bold shadow-sm">
            <i className="fa-solid fa-code"></i>
            <span className="hidden md:inline">{user.expertise}</span>
          </div>
        </div>

        {/* Notification Center Integration */}
        <NotificationCenter onNotificationClick={onNotificationClick} />

        <div className="relative flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-gray-800">{user.displayName}</p>
            <p className="text-xs text-gray-500">Online</p>
          </div>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="relative focus:outline-none"
          >
            <img
              src={user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white shadow-md cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
            />
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowUserMenu(false)}
              ></div>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-fade-in-up">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800 truncate">{user.displayName}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <i className="fa-solid fa-sign-out-alt"></i>
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
