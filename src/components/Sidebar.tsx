import { useState } from "react";
import {
  FileText,
  User,
  Settings,
  LogOut,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import logo from "../images/logo.png";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function Sidebar({
  currentPage,
  onNavigate,
  onLogout,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const topMenuItems = [
    { id: "invoices", icon: FileText, label: "Unpaid Invoices" },
  ];
  const bottomMenuItems = [
    { id: "account", icon: User, label: "Account" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div
      className={`bg-[#072249] h-screen flex flex-col transition-all duration-300 ease-in-out shadow-2xl sticky top-0 ${
        isCollapsed ? "w-20 px-3 py-6" : "w-72 px-6 py-6"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-[#0a1929]" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-[#0a1929]" />
        )}
      </button>

      {/* Logo */}
      <div
        className={`mb-12 animate-fade-in ${
          isCollapsed ? "flex justify-center" : ""
        }`}
      >
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
          <img src={logo} alt="Logo" className="w-12 h-12" />
        </div>
      </div>

      {/* Top Navigation (main) */}
      <nav className="flex-1 space-y-2">
        {topMenuItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center rounded-lg transition-all duration-200 group ${
              isCollapsed ? "justify-center px-3 py-3" : "gap-3 px-4 py-3"
            } ${
              currentPage === item.id
                ? "bg-white/10 text-white shadow-lg scale-105"
                : "text-white/60 hover:text-white hover:bg-white/5 hover:scale-105"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
            title={isCollapsed ? item.label : ""}
          >
            <item.icon
              className={`w-5 h-5 flex-shrink-0 ${
                currentPage === item.id ? "animate-bounce-gentle" : ""
              }`}
            />
            {!isCollapsed && (
              <span className="font-medium whitespace-nowrap overflow-hidden transition-all duration-300">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Navigation (account & settings) */}
      <div className="space-y-2 mb-3">
        {bottomMenuItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center rounded-lg transition-all duration-200 group ${
              isCollapsed ? "justify-center px-3 py-3" : "gap-3 px-4 py-3"
            } ${
              currentPage === item.id
                ? "bg-white/10 text-white shadow-lg scale-105"
                : "text-white/60 hover:text-white hover:bg-white/5 hover:scale-105"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
            title={isCollapsed ? item.label : ""}
          >
            <item.icon
              className={`w-5 h-5 flex-shrink-0 ${
                currentPage === item.id ? "animate-bounce-gentle" : ""
              }`}
            />
            {!isCollapsed && (
              <span className="font-medium whitespace-nowrap overflow-hidden transition-all duration-300">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Logout Button - Red Theme */}
      <button
        onClick={onLogout}
        className={`flex items-center rounded-lg bg-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-200 hover:scale-105 group ${
          isCollapsed ? "justify-center px-3 py-3" : "gap-3 px-4 py-3"
        }`}
        title={isCollapsed ? "Log Out" : ""}
      >
        <LogOut className="w-5 h-5 flex-shrink-0 group-hover:rotate-12 transition-transform" />
        {!isCollapsed && (
          <span className="font-medium whitespace-nowrap overflow-hidden transition-all duration-300">
            Log Out
          </span>
        )}
      </button>
    </div>
  );
}
