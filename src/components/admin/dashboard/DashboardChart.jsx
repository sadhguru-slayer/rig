"use client";

import { TrendingUp } from "lucide-react";
import { AreaChart, Area, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";

const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function DashboardChart({ monthly }) {
    // Transform backend data → chart format
    const chartData = MONTHS.map((m, i) => ({
        month: m,
        projects: monthly.projects[i],
        services: monthly.services[i],
        blogs: monthly.blogs[i],
        customers: monthly.customers[i],
    }));

    const chartConfig = {
        projects: { label: "Projects", color: "var(--chart-1)" },
        services: { label: "Services", color: "var(--chart-2)" },
        blogs: { label: "Blogs", color: "var(--chart-3)" },
        customers: { label: "Customers", color: "var(--chart-4)" },
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Activity Overview</CardTitle>
                <CardDescription>Tracking project, service, blog & customer growth</CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />

                        <Area
                            type="natural"
                            dataKey="projects"
                            fill="var(--color-projects)"
                            stroke="var(--color-projects)"
                            fillOpacity={0.3}
                        />
                        <Area
                            type="natural"
                            dataKey="services"
                            fill="var(--color-services)"
                            stroke="var(--color-services)"
                            fillOpacity={0.3}
                        />
                        <Area
                            type="natural"
                            dataKey="blogs"
                            fill="var(--color-blogs)"
                            stroke="var(--color-blogs)"
                            fillOpacity={0.3}
                        />
                        <Area
                            type="natural"
                            dataKey="customers"
                            fill="var(--color-customers)"
                            stroke="var(--color-customers)"
                            fillOpacity={0.3}
                        />

                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>

            <CardFooter>
                <p className="text-sm flex items-center gap-2">
                    Trending up this year <TrendingUp className="h-4 w-4" />
                </p>
            </CardFooter>
        </Card>
    );
}
