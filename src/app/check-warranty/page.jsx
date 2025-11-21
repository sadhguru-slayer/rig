"use client";
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Search, Download, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import './warranty.css'
import WarrantyPDF from "./WarrantyPdf";
import { pdf } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { BlobProvider } from '@react-pdf/renderer';
const pdfOptions = {
    method: 'save',
    resolution: Resolution.HIGH,
    page: {
        margin: Margin.SMALL,
        format: 'a4',
        orientation: 'landscape',
    },
    canvas: {
        mimeType: 'image/png',
        qualityRatio: 1,
    },
    overrides: {
        pdf: { compress: true },
        canvas: { useCORS: true }
    },
};



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

    const downloadCertificate = async (item, customerName, order) => {
        const blob = await pdf(<WarrantyPDF item={item} customerName={customerName} order={order} />).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = `Warranty_${customerName}_${item.service.title}.pdf`;
        link.click();
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
                                                                onClick={() => downloadCertificate(item, order.customer.name, order)}
                                                                className="text-teal-700 border-teal-200 hover:bg-teal-50 hover:cursor-pointer"
                                                            >
                                                                <Download size={16} className="mr-2" />
                                                                Download PDF
                                                            </Button>
                                                        </div>

                                                        {/* Warranty Certificate Preview (Hidden visually but used for PDF generation? No, let's show it nicely) */}
                                                        {/* Actually, let's show the details and have a hidden container for the "Certificate" look if we want a specific design */}
                                                        {/* For now, let's make the visible card THE certificate design */}

                                                        <PDFViewer
                                                            showToolbar={false}
                                                            width="100%" height="700">
                                                            <WarrantyPDF item={item} customerName={order.customer.name} order={order} />
                                                        </PDFViewer>




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