"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DatePicker } from "@/components/ui/date-picker";
import Divider from "@/components/Divider";
import OrderItem from "@/components/admin/order/OrderItem";
import LoadingCard from "@/components/ui/LoadingCard";

const EditOrderPage = () => {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [services, setServices] = useState([]);

    const [order, setOrder] = useState({
        customerId: "",
        installDate: null,
        issueDate: null,
        address: "",
    });

    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [custRes, servRes, orderRes] = await Promise.all([
                    fetch("/api/admin/customer"),
                    fetch("/api/admin/service"),
                    fetch(`/api/admin/order/${id}`)
                ]);

                const custData = await custRes.json();
                const servData = await servRes.json();
                const orderData = await orderRes.json();

                if (custData.success) setCustomers(custData.data || []);
                if (servData.success) setServices(servData.data || []);

                if (orderData.success && orderData.data) {
                    const o = orderData.data;
                    setOrder({
                        customerId: o.customerId,
                        installDate: o.installDate ? new Date(o.installDate) : null,
                        issueDate: o.issueDate ? new Date(o.issueDate) : null,
                        address: o.address,
                    });

                    // Map order items to state format
                    const items = o.orderItems.map(item => ({
                        serviceId: item.serviceId,
                        subServiceId: item.subServiceId || "",
                        quantity: item.quantity,
                        warranty: item.warranty || {}
                    }));
                    setOrderItems(items);
                } else {
                    toast.error("Failed to fetch order details");
                    router.push("/admin/order");
                }

            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id, router]);

    const handleChange = (field, value) => {
        setOrder((prev) => ({ ...prev, [field]: value }));
    };

    const handleItemChange = (index, newItem) => {
        const newItems = [...orderItems];
        newItems[index] = newItem;
        setOrderItems(newItems);
    };

    const handleAddItem = () => {
        setOrderItems([...orderItems, { serviceId: "", subServiceId: "", quantity: 1, warranty: {} }]);
    };

    const handleRemoveItem = (index) => {
        if (orderItems.length === 1) {
            toast.error("Order must have at least one item");
            return;
        }
        setOrderItems(orderItems.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        if (!order.customerId || !order.installDate || !order.issueDate || !order.address) {
            toast.error("Please fill in all required fields");
            setSaving(false);
            return;
        }

        // Validate items
        for (const item of orderItems) {
            if (!item.serviceId) {
                toast.error("All items must have a service selected");
                setSaving(false);
                return;
            }
        }

        try {
            const payload = {
                customerId: parseInt(order.customerId),
                installDate: order.installDate,
                issueDate: order.issueDate,
                address: order.address,
                orderItems: orderItems.map(item => ({
                    serviceId: parseInt(item.serviceId),
                    subServiceId: item.subServiceId ? parseInt(item.subServiceId) : null,
                    quantity: item.quantity,
                    warranty: item.warranty
                }))
            };

            const res = await fetch(`/api/admin/order/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Order updated successfully!");
                router.push("/admin/order");
            } else {
                toast.error(data.error || "Failed to update order");
            }
        } catch (error) {
            console.error("Error updating order:", error);
            toast.error(error.message || "Error updating order");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <LoadingCard text="Loading order details..." />;
    }

    return (
        <div className="p-1 md:p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit Order</h1>
            <form
                onSubmit={handleSubmit}
                className={`flex flex-col p-4 border rounded transition-opacity duration-200 ${saving ? "opacity-50 pointer-events-none" : "opacity-100"
                    }`}
            >
                <div className="">
                    <h2 className="font-bold mb-2 text-xl text-teal-700">Order Details</h2>

                    <label className="block mb-1 font-medium">Customer</label>
                    <select
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                        value={order.customerId}
                        onChange={(e) => handleChange("customerId", e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            Select a customer
                        </option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name} ({customer.phone})
                            </option>
                        ))}
                    </select>

                    <label className="block mb-1 font-medium">Install Date</label>
                    <div className="mb-2">
                        <DatePicker
                            date={order.installDate}
                            setDate={(date) => handleChange("installDate", date)}
                            placeholder="Pick an install date"
                        />
                    </div>

                    <label className="block mb-1 font-medium">Issue Date</label>
                    <div className="mb-2">
                        <DatePicker
                            date={order.issueDate}
                            setDate={(date) => handleChange("issueDate", date)}
                            placeholder="Pick an issue date"
                        />
                    </div>

                    <label className="block mb-1 font-medium">Address</label>
                    <Textarea
                        placeholder="Installation Address"
                        value={order.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        className="mb-2 w-full"
                        required
                    />
                </div>

                <Divider />

                <div className="mt-4">
                    <h2 className="font-bold mb-2 text-xl text-teal-700">Order Items</h2>
                    {orderItems.map((item, index) => (
                        <OrderItem
                            key={index}
                            index={index}
                            item={item}
                            services={services}
                            onChange={handleItemChange}
                            onRemove={handleRemoveItem}
                        />
                    ))}
                    <Button type="button" onClick={handleAddItem} variant="outline" className="w-full mt-2">
                        + Add Another Item
                    </Button>
                </div>

                <Divider />

                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 mt-4">
                    {saving ? "Saving..." : "Update Order"}
                </Button>
            </form>
        </div>
    );
};

export default EditOrderPage;