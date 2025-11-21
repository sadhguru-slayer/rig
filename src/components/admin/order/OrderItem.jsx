"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { addMonths, format } from "date-fns";
import { MdDeleteForever } from "react-icons/md";
import { Card, CardContent } from "@/components/ui/card";

const OrderItem = ({ index, item, services, onChange, onRemove }) => {
    const [selectedService, setSelectedService] = useState(null);
    const [selectedSubService, setSelectedSubService] = useState(null);

    // Sync local state with props
    useEffect(() => {
        if (item.serviceId) {
            const svc = services.find((s) => s.id === parseInt(item.serviceId));
            setSelectedService(svc || null);
        } else {
            setSelectedService(null);
        }

        if (item.subServiceId && services.length) {
            // Find subservice across all services or just the selected one?
            // Usually subservice belongs to the selected service.
            const svc = services.find((s) => s.id === parseInt(item.serviceId));
            if (svc) {
                const sub = svc.subServices?.find((s) => s.id === parseInt(item.subServiceId));
                setSelectedSubService(sub || null);
            }
        } else {
            setSelectedSubService(null);
        }
    }, [item.serviceId, item.subServiceId, services]);

    const handleServiceChange = (e) => {
        const serviceId = e.target.value;
        onChange(index, {
            ...item,
            serviceId,
            subServiceId: "", // Reset subservice
            warranty: {}, // Reset warranty
        });
    };

    const handleSubServiceChange = (e) => {
        const subServiceId = e.target.value;
        onChange(index, {
            ...item,
            subServiceId,
            warranty: {}, // Reset warranty
        });
    };

    const handleQuantityChange = (e) => {
        onChange(index, { ...item, quantity: parseInt(e.target.value) || 1 });
    };

    const generateWarranty = () => {
        const source = selectedSubService || selectedService;
        console.log(source);
        if (!source) return;

        // warrantyComponents is a JSON object/array in the DB.
        // The user schema says:
        // { "warrantyComponents": [ { "component": "SS Wire", ... } ] }
        // OR just an array? The user example shows:
        // { "warrantyComponents": [ ... ] }
        // But the prisma schema says `warrantyComponents Json?`.
        // I should handle both array or object with property.

        let components = [];
        if (Array.isArray(source.warrantyComponents)) {
            components = source.warrantyComponents;
        } else if (source.warrantyComponents?.warrantyComponents) {
            components = source.warrantyComponents.warrantyComponents;
        }

        if (!components || !components.length) {
            alert("No warranty components defined for this service/sub-service.");
            return;
        }

        const newWarranty = {};
        const today = new Date();

        components.forEach((comp) => {
            if (!comp.component) return;

            const startDate = today;
            const durationMonths = parseInt(comp.durationMonths) || 0;
            const expiresOn = addMonths(startDate, durationMonths);

            newWarranty[comp.component] = {
                label: comp.label,
                durationMonths: durationMonths,
                conditions: comp.conditions,
                info: comp.info,
                startDate: startDate.toISOString(), // Store as string
                expiresOn: expiresOn.toISOString(),
            };
        });

        onChange(index, { ...item, warranty: newWarranty });
    };

    const handleWarrantyDateChange = (componentName, newDate) => {
        if (!newDate) return;

        const currentWarranty = { ...item.warranty };
        const comp = currentWarranty[componentName];

        if (comp) {
            const durationMonths = comp.durationMonths || 0;
            const expiresOn = addMonths(newDate, durationMonths);

            currentWarranty[componentName] = {
                ...comp,
                startDate: newDate.toISOString(),
                expiresOn: expiresOn.toISOString(),
            };

            onChange(index, { ...item, warranty: currentWarranty });
        }
    };

    return (
        <Card className="mb-4 border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg">Item #{index + 1}</h3>
                    <Button variant="ghost" size="sm" onClick={() => onRemove(index)} className="text-red-500 hover:text-red-700">
                        <MdDeleteForever size={20} />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Service */}
                    <div>
                        <Label>Service *</Label>
                        <select
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            value={item.serviceId || ""}
                            onChange={handleServiceChange}
                        >
                            <option value="">Select Service</option>
                            {services.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sub Service */}
                    <div>
                        <Label>Sub Service</Label>
                        <select
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            value={item.subServiceId || ""}
                            onChange={handleSubServiceChange}
                            disabled={!selectedService || !selectedService.subServices?.length}
                        >
                            <option value="">Select Sub Service</option>
                            {selectedService?.subServices?.map((sub) => (
                                <option key={sub.id} value={sub.id}>
                                    {sub.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Quantity */}
                    <div>
                        <Label>Quantity</Label>
                        <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={handleQuantityChange}
                        />
                    </div>
                </div>

                {/* Warranty Section */}
                <div className="mt-4 border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-700">Warranty Details</h4>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={generateWarranty}
                            disabled={!selectedService}
                        >
                            Generate Warranty
                        </Button>
                    </div>

                    {item.warranty && Object.keys(item.warranty).length > 0 ? (
                        <div className="space-y-4 mt-2">
                            {Object.entries(item.warranty).map(([key, data]) => (
                                <div key={key} className="bg-slate-50 p-3 rounded border">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-sm text-blue-700">{key}</span>
                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                            {data.durationMonths} Months
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-1">{data.label}</p>
                                    <p className="text-xs text-gray-500 italic mb-2">{data.conditions}</p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-xs">Start Date</Label>
                                            <DatePicker
                                                date={data.startDate ? new Date(data.startDate) : null}
                                                setDate={(date) => handleWarrantyDateChange(key, date)}
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs">Expires On</Label>
                                            <div className="h-10 flex items-center px-3 text-sm border rounded bg-gray-100 text-gray-500">
                                                {data.expiresOn ? format(new Date(data.expiresOn), "PPP") : "-"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-sm text-gray-400 italic text-center py-2">
                            No warranty generated yet. Select a service and click "Generate Warranty".
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderItem;
