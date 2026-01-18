import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { motion } from "framer-motion";
import { BarChart2, Users, Briefcase, Zap, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { adminDashboardAPI, adminDownloadReportAPI } from "../../services/allAPI";

// Mock Data for Charts
// const data = [
// 	{ name: "Mon", applications: 40, jobs: 24 },
// 	{ name: "Tue", applications: 30, jobs: 13 },
// 	{ name: "Wed", applications: 20, jobs: 58 },
// 	{ name: "Thu", applications: 27, jobs: 39 },
// 	{ name: "Fri", applications: 18, jobs: 48 },
// 	{ name: "Sat", applications: 23, jobs: 38 },
// 	{ name: "Sun", applications: 34, jobs: 43 },
// ];

const StatCard = ({ name, icon: Icon, value, color }) => {
	return (
		<motion.div
			whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700"
		>
			<div className="px-4 py-5 sm:p-6">
				<span className="flex items-center text-sm font-medium text-gray-400">
					<Icon size={20} className="mr-2" style={{ color }} />
					{name}
				</span>
				<div className="mt-1 text-3xl font-semibold text-white">{value}</div>
			</div>
		</motion.div>
	);
};

const AdminHome = () => {

	const [stats, setStats] = useState(null);
	const [logs, setLogs] = useState([]);
	const [chartData, setChartData] = useState([]);
	const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	useEffect(() => {
		fetchDashboard();
	}, []);

	const fetchDashboard = async () => {
		const token = sessionStorage.getItem("token");

		const reqHeader = {
			Authorization: `Bearer ${token}`
		};

		const result = await adminDashboardAPI(reqHeader);

		if (result.status === 200) {
			setStats(result.data.stats);
			setLogs(result.data.recentLogs);

			const formatted = formatChartData(
				result.data.trends.applications,
				result.data.trends.jobs
			);

			setChartData(formatted);
		}
	};

	const formatChartData = (apps, jobs) => {
		const map = {};

		apps.forEach(item => {
			map[item._id] = { applications: item.applications };
		});

		jobs.forEach(item => {
			map[item._id] = {
				...map[item._id],
				jobs: item.jobs
			};
		});

		return Object.keys(map).map(key => ({
			name: DAYS[key - 1],
			applications: map[key].applications || 0,
			jobs: map[key].jobs || 0
		}));
	};

	const handleDownloadReport = async () => {
		const token = sessionStorage.getItem("token");

		const reqHeader = {
			Authorization: `Bearer ${token}`,
		};

		const res = await adminDownloadReportAPI(reqHeader);

		if (res.status === 200) {
			const blob = new Blob([res.data], { type: "text/csv" });
			const url = window.URL.createObjectURL(blob);

			const link = document.createElement("a");
			link.href = url;
			link.download = "admin-dashboard-report.csv";
			document.body.appendChild(link);
			link.click();

			link.remove();
			window.URL.revokeObjectURL(url);
		}
	};


	return (
		<>
			<div className="p-6 space-y-6">
				{/* Welcome Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="flex justify-between items-center"
				>
					<div>
						<h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
						<p className="text-gray-400 mt-1">Real-time insights for AutoJob AI</p>
					</div>
					<motion.button
						whileHover={{ scale: 1.05 }}
						onClick={handleDownloadReport}
						className="bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold shadow-lg hover:bg-blue-500 transition"
					>
						Download Report
					</motion.button>
				</motion.div>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

					<StatCard
						name="Total Jobs"
						icon={Briefcase}
						value={stats?.totalJobs || 0}
						color="#6366F1"
					/>
					<StatCard
						name="Total Users"
						icon={Users}
						value={stats?.totalUsers || 0}
						color="#8B5CF6"
					/>
					<StatCard
						name="AI Applications"
						icon={Zap}
						value={stats?.aiApplications || 0}
						color="#EC4899"
					/>
					<StatCard
						name="Conversion Rate"
						icon={TrendingUp}
						value={`${stats?.conversionRate || 0}%`}
						color="#10B981"
					/>

				</div>

				{/* Charts Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

					{/* Area Chart: Application Trends */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700 shadow-lg"
					>
						<h2 className="text-xl font-semibold text-white mb-4">Application Trends</h2>
						<div className="h-80">
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart data={chartData}>
									<defs>
										<linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
											<stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
										</linearGradient>
									</defs>

									<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
									<XAxis dataKey="name" stroke="#9CA3AF" />
									<YAxis stroke="#9CA3AF" />
									<Tooltip
										contentStyle={{
											backgroundColor: "#1F2937",
											borderColor: "#374151"
										}}
										itemStyle={{ color: "#E5E7EB" }}
									/>

									<Area
										type="monotone"
										dataKey="applications"
										stroke="#8B5CF6"
										fillOpacity={1}
										fill="url(#colorApps)"
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</motion.div>

					{/* Line Chart: Job Postings */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700 shadow-lg"
					>
						<h2 className="text-xl font-semibold text-white mb-4">Job Postings Activity</h2>
						<div className="h-80">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={chartData}>
									<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
									<XAxis dataKey="name" stroke="#9CA3AF" />
									<YAxis stroke="#9CA3AF" />
									<Tooltip
										contentStyle={{
											backgroundColor: "#1F2937",
											borderColor: "#374151"
										}}
										itemStyle={{ color: "#E5E7EB" }}
									/>

									<Line
										type="monotone"
										dataKey="jobs"
										stroke="#10B981"
										strokeWidth={3}
										dot={{ r: 5 }}
										activeDot={{ r: 8 }}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</motion.div>
				</div>

				{/* Recent Activity (Glassmorphism) */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4 }}
					className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700 shadow-lg"
				>
					<h2 className="text-xl font-semibold text-white mb-4">Recent System Logs</h2>
					<div className="space-y-4">
						{logs.map((log, index) => (
							<div
								key={index}
								className="flex items-center justify-between p-3 hover:bg-gray-700 rounded-lg transition-colors"
							>
								<div className="flex items-center gap-4">
									<div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
										<Zap size={18} />
									</div>
									<div>
										<p className="text-white font-medium">
											New Application Processed
										</p>
										<p className="text-gray-400 text-sm">
											{log.userId?.username} • {log.jobId?.jobTitle}
										</p>
									</div>
								</div>
								<span className="text-gray-500 text-sm">
									{new Date(log.createdAt).toLocaleString()}
								</span>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</>
	);
};

export default AdminHome;