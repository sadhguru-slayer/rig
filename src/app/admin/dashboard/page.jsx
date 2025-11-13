"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Folder,
  FileText,
  Users,
  Loader2,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
       const res = await fetch(`/api/admin/overview/`);
      const json = await res.json();
      if (json.success) setStats(json.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader2 className="animate-spin text-gray-400" size={30} />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center text-gray-500 mt-20">
        Failed to load dashboard data.
      </div>
    );
  }

  // Example data for bar chart (you can replace with backend data)
  const chartData = [
    { name: "Projects", value: stats.projects || 0 },
    { name: "Services", value: stats.services || 0 },
    { name: "Blogs", value: stats.blogs || 0 },
    { name: "Clients", value: stats.clients || 0 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <Calendar size={15} />
          {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Projects"
          value={stats.projects}
          icon={<Folder className="text-blue-500" size={20} />}
        />
        <StatCard
          title="Services"
          value={stats.services}
          icon={<Briefcase className="text-purple-500" size={20} />}
        />
        <StatCard
          title="Blogs"
          value={stats.blogs}
          icon={<FileText className="text-green-500" size={20} />}
        />
        <StatCard
          title="Clients"
          value={stats.clients}
          icon={<Users className="text-orange-500" size={20} />}
        />
      </div>

      {/* Chart Section */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-500" />
              Activity Overview
            </h2>
            <span className="text-sm text-gray-400">Last 30 days</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} barSize={35}>
              <XAxis
                dataKey="name"
                tick={{ fill: "#888", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#888", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "#f9fafb" }}
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  background: "#fff",
                }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

// Reusable Stat Card
const StatCard = ({ title, value, icon }) => (
  <Card className="hover:shadow-md border border-gray-100 transition-all duration-300 bg-white">
    <CardContent className="p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800">{value ?? 0}</h2>
      </div>
      <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
    </CardContent>
  </Card>
);
