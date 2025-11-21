"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DatePicker } from "@/components/ui/date-picker";
import Divider from "@/components/Divider";
import OrderItem from "@/components/admin/order/OrderItem";

const CreateOrderPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [services, setServices] = useState([]);

    const [order, setOrder] = useState({
        customerId: "",
        installDate: null,
        issueDate: null,
        address: "",
    });

    const [orderItems, setOrderItems] = useState([
        { serviceId: "", subServiceId: "", quantity: 1, warranty: {} }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [custRes, servRes] = await Promise.all([
                    fetch("/api/admin/customer"),
                    fetch("/api/admin/service")
                ]);

                const custData = await custRes.json();
                const servData = await servRes.json();

                if (custData.success) setCustomers(custData.data || []);
                if (servData.success) setServices(servData.data || []);

            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error fetching initial data");
            }
        };
        fetchData();
    }, []);

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
        if (orderItems.length === 1) return;
        setOrderItems(orderItems.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!order.customerId || !order.installDate || !order.issueDate || !order.address) {
            toast.error("Please fill in all required fields");
            setLoading(false);
            return;
        }

        // Validate items
        for (const item of orderItems) {
            if (!item.serviceId) {
                toast.error("All items must have a service selected");
                setLoading(false);
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

            const res = await fetch("/api/admin/order/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Order created successfully!");
                router.push("/admin/order");
            } else {
                toast.error(data.error || "Failed to create order");
            }
        } catch (error) {
            console.error("Error creating order:", error);
            toast.error(error.message || "Error creating order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-1 md:p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create Order</h1>
            <form
                onSubmit={handleSubmit}
                className={`flex flex-col p-4 border rounded transition-opacity duration-200 ${loading ? "opacity-50 pointer-events-none" : "opacity-100"
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
                    {loading ? "Creating..." : "Create Order"}
                </Button>
            </form>
        </div>
    );
};

export default CreateOrderPage;
