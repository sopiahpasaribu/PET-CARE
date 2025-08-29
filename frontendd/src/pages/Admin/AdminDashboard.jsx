import { useState, useEffect } from "react";
import { getAllBookings } from "../../services/api";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import {
  ClipboardDocumentListIcon,
  ClockIcon,
  CheckCircleIcon,
  InboxIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAllBookings();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <LoadingSpinner />;

  // Hitung jumlah booking berdasarkan status
  const totalBookings = bookings.length;
  const pending = bookings.filter((b) => b.status === "PENDING").length;
  const confirmed = bookings.filter((b) => b.status === "CONFIRMED").length;
  const completed = bookings.filter((b) => b.status === "COMPLETED").length;
  const cancelled = bookings.filter((b) => b.status === "CANCELLED").length;

  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: ClipboardDocumentListIcon,
      bg: "bg-gradient-to-r from-indigo-500 to-purple-600",
      text: "text-white",
      border: "border-l-4 border-indigo-700",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      title: "Pending",
      value: pending,
      icon: ClockIcon,
      bg: "bg-gradient-to-r from-amber-400 to-orange-500",
      text: "text-white",
      border: "border-l-4 border-amber-700",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      title: "Confirmed",
      value: confirmed,
      icon: CheckCircleIcon,
      bg: "bg-gradient-to-r from-emerald-400 to-green-600",
      text: "text-white",
      border: "border-l-4 border-emerald-700",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Completed",
      value: completed,
      icon: InboxIcon,
      bg: "bg-gradient-to-r from-sky-400 to-blue-600",
      text: "text-white",
      border: "border-l-4 border-sky-700",
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
    },
    {
      title: "Cancelled",
      value: cancelled,
      icon: XCircleIcon,
      bg: "bg-gradient-to-r from-rose-400 to-red-600",
      text: "text-white",
      border: "border-l-4 border-rose-700",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Overview of all booking activities and statuses
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`flex flex-col p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${stat.bg} ${stat.border} relative overflow-hidden`}
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <p className="text-sm font-semibold opacity-90">{stat.title}</p>
                  <p className={`mt-2 text-3xl font-bold ${stat.text}`}>{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.iconBg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-1 bg-white bg-opacity-30 rounded-full">
                  <div 
                    className="h-full bg-white rounded-full" 
                    style={{ width: `${(stat.value / totalBookings) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional dashboard content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800">Quick Actions</h3>
              <div className="mt-3 space-y-2">
                <button className="w-full text-left py-2 px-3 bg-white rounded-md text-sm text-gray-700 hover:bg-blue-100 transition-colors">
                  View All Bookings
                </button>
                <button className="w-full text-left py-2 px-3 bg-white rounded-md text-sm text-gray-700 hover:bg-blue-100 transition-colors">
                  Generate Report
                </button>
                <button className="w-full text-left py-2 px-3 bg-white rounded-md text-sm text-gray-700 hover:bg-blue-100 transition-colors">
                  Manage Users
                </button>
              </div>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg md:col-span-2">
              <h3 className="font-medium text-amber-800">Pending Actions</h3>
              <div className="mt-3">
                <div className="flex items-center justify-between py-3 border-b border-amber-200">
                  <div>
                    <p className="text-sm font-medium">5 pending approvals</p>
                    <p className="text-xs text-amber-600">Bookings waiting for confirmation</p>
                  </div>
                  <button className="text-xs bg-amber-500 text-white py-1 px-3 rounded-full hover:bg-amber-600 transition-colors">
                    Review
                  </button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">2 unresolved issues</p>
                    <p className="text-xs text-amber-600">Require immediate attention</p>
                  </div>
                  <button className="text-xs bg-amber-500 text-white py-1 px-3 rounded-full hover:bg-amber-600 transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}