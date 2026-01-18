import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BarChart2, Users, Settings, Briefcase, Menu, X, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();

	const SIDEBAR_ITEMS = [
		{ name: "Dashboard", icon: BarChart2, color: "#6366f1", href: "/admin/home" },
		{ name: "Manage Jobs", icon: Briefcase, color: "#8B5CF6", href: "/admin/jobs" },
		{ name: "Candidates", icon: Users, color: "#EC4899", href: "/admin/users" },
		{ name: "Settings", icon: Settings, color: "#10B981", href: "/admin/settings" },
	];

	const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

	return (
		<div className="relative z-10 transition-all duration-300 ease-in-out shrink-0">
			<div
				className={`h-screen bg-gray-900 border-r border-gray-800 p-4 flex flex-col transition-all duration-300 ${
					isSidebarOpen ? "w-64" : "w-20"
				}`}
			>
				{/* Logo Section */}
				<div className="flex items-center justify-between mb-8">
					<motion.h1
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className={`text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent whitespace-nowrap ${
							!isSidebarOpen && "hidden"
						}`}
					>
						AutoJob AI
					</motion.h1>
					<button
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						className="p-2 rounded-full hover:bg-gray-800 transition-colors"
					>
						{isSidebarOpen ? <Menu size={24} color="white" /> : <Menu size={24} color="white" />}
					</button>
				</div>

				{/* Navigation Links */}
				<nav className="flex-1 space-y-2">
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div
								whileHover={{ scale: 1.02, x: 5 }}
								whileTap={{ scale: 0.95 }}
								className={`flex items-center p-3 rounded-xl transition-all mb-2 ${
									location.pathname === item.href
										? "bg-gray-800 border-l-4 border-blue-500 text-white shadow-lg"
										: "text-gray-400 hover:bg-gray-800 hover:text-white"
								}`}
							>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											className="ml-4 font-medium whitespace-nowrap"
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>

				{/* Logout Button */}
				<div className="mt-auto border-t border-gray-800 pt-4">
					<motion.button
						whileHover={{ scale: 1.02 }}
						onClick={handleLogout}
						className="w-full flex items-center p-3 text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-xl transition-colors"
					>
						<LogOut size={20} />
						{isSidebarOpen && <span className="ml-4 font-medium">Logout</span>}
					</motion.button>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;