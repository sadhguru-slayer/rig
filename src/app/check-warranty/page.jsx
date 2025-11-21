"use client";
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Search, Download, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const WarrantyCheckPage = () => {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!phone) {
            toast.error("Please enter a phone number");
            return;
        }

        setLoading(true);
        setOrders(null);
        setExpandedOrder(null);

        try {
            const res = await fetch(`/api/check-warranty?phone=${encodeURIComponent(phone)}`);
            const data = await res.json();

            if (data.success) {
                if (data.data.length === 0) {
                    toast.info("No orders found for this phone number");
                }
                setOrders(data.data);
            } else {
                toast.error(data.error || "Failed to fetch orders");
            }
        } catch (error) {
            console.error("Error searching:", error);
            toast.error("An error occurred while searching");
        } finally {
            setLoading(false);
        }
    };

    const toggleOrder = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const downloadCertificate = async (itemId, customerName, serviceName) => {
        const element = document.getElementById(`warranty-card-${itemId}`);
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                scale: 3,
                useCORS: true,
                backgroundColor: "#ffffff",
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "a4",
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, (pageHeight - imgHeight) / 2, imgWidth, imgHeight);
            pdf.save(`Warranty_${customerName}_${serviceName}.pdf`);

            toast.success("Warranty certificate downloaded!");
        } catch (error) {
            console.error("Error generating PDF:", error);
            toast.error("Failed to generate PDF");
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-teal-800 mb-2">Warranty Check</h1>
                    <p className="text-gray-600">Enter your registered phone number to view your warranties.</p>
                </div>

                <Card className="mb-8 shadow-md border-teal-100">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <Input
                                type="tel"
                                placeholder="Enter Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="flex-1"
                            />
                            <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700 text-white">
                                {loading ? <Loader2 className="animate-spin" /> : <Search size={18} />}
                                <span className="ml-2 hidden sm:inline">Search</span>
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {orders && (
                    <div className="space-y-4">
                        {orders.length === 0 && !loading && (
                            <div className="text-center py-8 text-gray-500">
                                No orders found. Please check the number and try again.
                            </div>
                        )}

                        {orders.map((order) => (
                            <Card key={order.id} className="overflow-hidden border-l-4 border-l-teal-500 shadow-sm">
                                <div
                                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => toggleOrder(order.id)}
                                >
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Order #{order.orderNo}</h3>
                                        <p className="text-sm text-gray-500">
                                            Installed: {order.installDate ? format(new Date(order.installDate), "PPP") : "N/A"}
                                        </p>
                                    </div>
                                    <div className="text-teal-600">
                                        {expandedOrder === order.id ? <ChevronUp /> : <ChevronDown />}
                                    </div>
                                </div>

                                {expandedOrder === order.id && (
                                    <div className="bg-gray-50 p-4 border-t border-gray-100">
                                        <div className="space-y-6">
                                            {order.orderItems.map((item, index) => {
                                                const hasWarranty = item.warranty && Object.keys(item.warranty).length > 0;
                                                if (!hasWarranty) return null;

                                                return (
                                                    <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div>
                                                                <h4 className="font-bold text-lg text-teal-800">
                                                                    {item.service.title}
                                                                    {item.subService && <span className="text-teal-600"> - {item.subService.title}</span>}
                                                                </h4>
                                                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                                            </div>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => downloadCertificate(item.id, order.customer.name, item.service.name)}
                                                                className="text-teal-700 border-teal-200 hover:bg-teal-50 hover:cursor-pointer"
                                                            >
                                                                <Download size={16} className="mr-2" />
                                                                Download PDF
                                                            </Button>
                                                        </div>

                                                        {/* Warranty Certificate Preview (Hidden visually but used for PDF generation? No, let's show it nicely) */}
                                                        {/* Actually, let's show the details and have a hidden container for the "Certificate" look if we want a specific design */}
                                                        {/* For now, let's make the visible card THE certificate design */}

                                                        <div className="flex justify-center">
                                                            <div
                                                                id={`warranty-card-${item.id}`}
                                                                className="relative bg-white border-2 border-teal-200 shadow-xl rounded-xl p-10"
                                                                style={{
                                                                    width: "1000px",           // fixed desktop width
                                                                    maxWidth: "1000px",
                                                                    minHeight: "700px",        // keeps certificate height consistent
                                                                    margin: "auto",
                                                                    backgroundColor: "white",
                                                                }}
                                                            >
                                                                {/* WATERMARK */}
                                                                <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-teal-50 rounded-full opacity-40"></div>
                                                                <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-gray-100 rounded-full opacity-30"></div>

                                                                {/* CONTENT */}
                                                                <div className="relative z-10 text-center">
                                                                    <h2 className="text-3xl font-serif font-bold text-teal-900 mb-1">
                                                                        WARRANTY CERTIFICATE
                                                                    </h2>
                                                                    <div className="h-1 w-28 bg-teal-500 mx-auto mb-8"></div>

                                                                    {/* Top customer details */}
                                                                    <div className="grid grid-cols-2 gap-6 text-sm text-left mb-10">
                                                                        <div>
                                                                            <p className="text-gray-500">Customer Name</p>
                                                                            <p className="font-semibold text-gray-800">{order.customer.name}</p>
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-gray-500">Order Number</p>
                                                                            <p className="font-semibold text-gray-800">{order.orderNo}</p>
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-gray-500">Service</p>
                                                                            <p className="font-semibold text-gray-800">{item.service.title}</p>
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-gray-500">Installation Date</p>
                                                                            <p className="font-semibold text-gray-800">
                                                                                {order.installDate ? format(new Date(order.installDate), "PPP") : "N/A"}
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    {/* Grey certificate body */}
                                                                    <div className="bg-gray-50 p-6 rounded-xl text-left space-y-6">

                                                                        {/* SERVICE TITLE */}
                                                                        <h4 className="text-xl font-bold text-teal-800 border-l-4 border-teal-600 pl-4">
                                                                            {item.service.title}
                                                                        </h4>

                                                                        {/* SUBSERVICE TITLE IF EXISTS */}
                                                                        {item.subService && (
                                                                            <h5 className="text-lg font-semibold text-gray-700 pl-4">
                                                                                {item.subService.title}
                                                                            </h5>
                                                                        )}

                                                                        {/* WARRANTY COVERAGE */}
                                                                        <div>
                                                                            <h5 className="font-semibold text-teal-700 border-b border-teal-200 pb-1 mb-3">
                                                                                Warranty Coverage
                                                                            </h5>

                                                                            <div className="space-y-3">
                                                                                {Object.entries(item.warranty).map(([key, w]) => (
                                                                                    <div
                                                                                        key={key}
                                                                                        className="flex justify-between text-sm border-b border-dashed border-gray-300 pb-2"
                                                                                    >
                                                                                        <span className="text-gray-700 font-medium">{w.label}</span>
                                                                                        <span className="text-gray-900">
                                                                                            {w.durationMonths} Months
                                                                                            {w.expiresOn &&
                                                                                                ` (Expires: ${format(new Date(w.expiresOn), "PP")})`}
                                                                                        </span>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* FOOTER */}
                                                                    <div className="mt-10 pt-4 border-t border-gray-200 flex justify-between items-end text-xs text-gray-500">
                                                                        <div>
                                                                            <p>InvisibleGrills</p>
                                                                            <p>Support: +91 1234567890</p>
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <p>Authorized Signature</p>
                                                                            <div className="h-10"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                );
                                            })}

                                            {order.orderItems.every(item => !item.warranty || Object.keys(item.warranty).length === 0) && (
                                                <div className="text-center text-gray-500 italic">No warranty information available for items in this order.</div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WarrantyCheckPage;