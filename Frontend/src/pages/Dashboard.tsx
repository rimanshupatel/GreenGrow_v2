import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Activity } from "lucide-react"; // make sure to import the icon

import {
  LayoutDashboard,
  Leaf,
  CloudSun,
  MessageSquare,
  BarChart2,
  Users,
  Settings,
  Bell,
  Search,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ✅ Type definitions
interface UserData {
  name: string;
  email: string;
}

interface ApiUserResponse {
  user?: {
    name: string;
    email: string;
  };
  msg?: string;
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useState<UserData>({ name: "User", email: "user@example.com" });

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      try {
        const response = await fetch("http://localhost:8000/api/auth/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include session cookies
        });

        const data: ApiUserResponse = await response.json();
        if (response.ok && data.user) {
          setUser({ name: data.user.name, email: data.user.email });
        } else {
          console.warn("Failed to fetch user data:", data.msg);
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-agri-50 to-agri-100 border-r border-agri-200 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        } hidden md:block`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div
            className={`p-4 border-b border-gray-200 flex ${
              isSidebarOpen ? "justify-between" : "justify-center"
            }`}
          >
            {isSidebarOpen ? (
              <Link to="/" className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-green-900 text-transparent bg-clip-text animate-pulse">
                  Agrinova
                </span>
              </Link>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-agri-400 to-agri-600 flex items-center justify-center text-white font-bold text-xl">
                AGRI
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-agri-600 transition-colors"
            >
              <ChevronDown
                className={`h-5 w-5 transform ${isSidebarOpen ? "" : "rotate-180"}`}
              />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            <Link
              to="/dashboard/Realtimeprediction"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-agri-50 hover:text-agri-600 rounded-lg font-medium"
            >
              <Activity className="h-5 w-5 text-agri-500" />
              {isSidebarOpen && <span>Realtime prediction</span>}
            </Link>
            <Link
              to="/dashboard/DroneModule"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-agri-50 hover:text-agri-600 rounded-lg font-medium"
            >
              <Activity className="h-5 w-5 text-agri-500" />
              {isSidebarOpen && <span>Drone Module</span>}
            </Link>
            <Link
              to="/dashboard/DiseasePrediction"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-agri-50 hover:text-agri-600 rounded-lg font-medium"
            >
              <LayoutDashboard className="h-5 w-5 text-agri-500" />
              {isSidebarOpen && <span>Disease Prediction</span>}
            </Link>
            <Link
              to="/dashboard/CropPrediction"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-agri-50 hover:text-agri-600 rounded-lg font-medium"
            >
              <Leaf className="h-5 w-5 text-agri-500" />
              {isSidebarOpen && <span>Crop Prediction</span>}
            </Link>
            <Link
              to="/dashboard/Weather"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-agri-50 hover:text-agri-600 rounded-lg font-medium"
            >
              <CloudSun className="h-5 w-5 text-agri-500" />
              {isSidebarOpen && <span>Weather Forecast</span>}
            </Link>
            <Link
              to="/dashboard/AIAssistant"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-agri-50 hover:text-agri-600 rounded-lg font-medium"
            >
              <MessageSquare className="h-5 w-5 text-agri-500" />
              {isSidebarOpen && <span>AI Assistant</span>}
            </Link>

            <Link
              to="/dashboard/AgrinovaCallPage"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-agri-50 hover:text-agri-600 rounded-lg font-medium"
            >
              <BarChart2 className="h-5 w-5 text-agri-500" />
              {isSidebarOpen && <span>Ai-Calling Assistent</span>}
            </Link>

            <Link
              to="/dashboard/CropProductionPrediction"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-agri-50 hover:text-agri-600 rounded-lg font-medium"
            >
              <BarChart2 className="h-5 w-5 text-agri-500" />
              {isSidebarOpen && <span>Crop Production Prediction</span>}
            </Link>
            <Link
              to="/dashboard/SmartStorageAdvisor"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-agri-50 hover:text-agri-600 rounded-lg font-medium"
              onClick={toggleMobileMenu}
            >
              <Users className="h-5 w-5 text-agri-500" />
              <span>Smart Storage Advisor</span>
            </Link>

            <Link
              to="/dashboard/Community"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-agri-50 hover:text-agri-600 rounded-lg font-medium"
            >
              <Users className="h-5 w-5 text-agri-500" />
              {isSidebarOpen && <span>Agri Community</span>}
            </Link>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <Link
              to="/dashboard/settings"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-agri-50 hover:text-agri-600 rounded-lg font-medium"
            >
              <Settings className="h-5 w-5 text-agri-500" />
              {isSidebarOpen && <span>Settings</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex justify-between items-center p-4">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-500 hover:text-agri-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Logo (Mobile) */}
            <div className="md:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-agri-400 to-agri-600 flex items-center justify-center text-white font-bold text-lg">
                K
              </div>
              <span className="text-xl font-bold gradient-text">Agrinova</span>
            </div>

            {/* Search (Desktop) */}
            <div className="hidden md:flex items-center flex-1 mx-4 lg:mx-16">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-input w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side Items */}
            <div className="flex items-center gap-3">
              {/* Notification */}
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-agri-600 relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-agri-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-agri-600" />
                    </div>
                    <span className="hidden md:inline text-sm font-medium">
                      {user.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-500 flex items-center gap-2"
                    asChild
                  >
                    <Link to="/login">
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Outlet */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-green-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
