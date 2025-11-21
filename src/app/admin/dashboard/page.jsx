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
import DashboardChart from "@/components/admin/dashboard/DashboardChart";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`/api/admin/overview/`);
        const json = await res.json();
        console.log(json.data);
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
    { name: "Projects", value: stats.counts.projects || 0 },
    { name: "Services", value: stats.counts.services || 0 },
    { name: "Blogs", value: stats.counts.blogs || 0 },
    { name: "Clients", value: stats.counts.customers || 0 },
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
      <div className="
  grid
  grid-cols-1 
  sm:grid-cols-2 
  md:grid-cols-3 
  xl:grid-cols-5 
  gap-5
">
        <StatCard
          title="Projects"
          value={stats.counts.projects}
          icon={<Folder className="text-blue-500" size={20} />}
        />

        <StatCard
          title="Services"
          value={stats.counts.services}
          icon={<Briefcase className="text-purple-500" size={20} />}
        />

        <StatCard
          title="Blogs"
          value={stats.counts.blogs}
          icon={<FileText className="text-green-500" size={20} />}
        />

        <StatCard
          title="Customers"
          value={stats.counts.customers}
          icon={<Users className="text-orange-500" size={20} />}
        />

        <StatCard
          title="Orders"
          value={stats.counts.orders}
          icon={<TrendingUp className="text-red-500" size={20} />}
        />
      </div>

      {stats && (
        <DashboardChart monthly={stats.monthly} />
      )}
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
