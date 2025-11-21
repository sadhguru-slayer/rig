"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MdDeleteForever } from "react-icons/md";
import LoadingCard from "@/components/ui/LoadingCard";
import { SlReload } from "react-icons/sl";
import { toast } from "sonner";
import EmptyCard from "@/components/ui/EmptyCard";
import ConfirmDeleteDialog from "@/components/ui/ConfirmDeleteDialog";
import { format } from "date-fns";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
    const [bulkDeleting, setBulkDeleting] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [bulkCurrentIndex, setBulkCurrentIndex] = useState(0);
    const router = useRouter();

    // Fetch all orders
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/order");
            const data = await res.json();
            if (data.success) {
                setOrders(data.data || []);
            } else {
                toast.error(data.error || "Failed to fetch orders");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleOpenDeleteModal = (order) => {
        setSelectedOrder(order);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedOrder) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/admin/order/${selectedOrder.id}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (data.success) {
                toast.success("Order deleted successfully!");
                setSelectedIds((prev) =>
                    prev.filter((id) => id !== selectedOrder.id)
                );
                await fetchOrders();
            } else {
                toast.error(data.error || "Failed to delete order");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            setDeleteModalOpen(false);
            setSelectedOrder(null);
        }
    };

    // selection helpers
    const toggleSelectAll = () => {
        if (selectedIds.length === orders.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(orders.map((o) => o.id));
        }
    };

    const toggleSelectOne = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        );
    };

    const clearSelection = () => setSelectedIds([]);

    // bulk delete
    const handleBulkDelete = async () => {
        if (!selectedIds.length) return;
        setBulkDeleting(true);
        setBulkCurrentIndex(0);
        try {
            const ids = [...selectedIds];
            const failedIds = [];

            for (let i = 0; i < ids.length; i++) {
                const id = ids[i];
                setBulkCurrentIndex(i + 1);

                try {
                    const res = await fetch(`/api/admin/order/${id}`, {
                        method: "DELETE",
                    });
                    const data = await res.json();
                    if (!data.success) {
                        failedIds.push(id);
                    }
                } catch {
                    failedIds.push(id);
                }
            }

            if (failedIds.length) {
                toast.error("Some orders could not be deleted.");
            } else {
                toast.success("Selected orders deleted successfully!");
            }

            setSelectedIds([]);
            await fetchOrders();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setBulkDeleting(false);
            setBulkDeleteOpen(false);
        }
    };

    // export helpers
    const handleExportSelected = () => {
        const rows = orders.filter((o) => selectedIds.includes(o.id));
        if (!rows.length) return;

        const headers = ["Order No", "Customer", "Phone", "Install Date", "Issue Date", "Items Count"];

        const escape = (val) => {
            const str = val == null ? "" : String(val);
            const escaped = str.replace(/"/g, '""');
            return `"${escaped}"`;
        };

        const csv = [
            headers.join(","),
            ...rows.map((o) =>
                [
                    escape(o.orderNo),
                    escape(o.customer?.name),
                    escape(o.customer?.phone),
                    escape(o.installDate ? new Date(o.installDate).toLocaleDateString() : ""),
                    escape(o.issueDate ? new Date(o.issueDate).toLocaleDateString() : ""),
                    escape(o._count?.orderItems || 0),
                ].join(",")
            ),
        ].join("\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "orders.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="p-1 md:p-4">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>

            {/* Top Action Bar */}
            <div className="flex items-center justify-between mb-4">
                <Button
                    variant="default"
                    size="sm"
                    onClick={() => router.push("/admin/order/create")}
                >
                    Create Order
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchOrders}
                    disabled={loading}
                    className={loading ? "cursor-not-allowed" : ""}
                >
                    <SlReload
                        className="transition-transform"
                        style={{
                            animation: loading ? "spin-reverse 1s linear infinite" : "none",
                        }}
                    />
                </Button>
            </div>

            {/* Bulk actions */}
            {selectedIds.length > 0 && (
                <div className="mb-4 flex items-center justify-between rounded-md border bg-muted px-3 py-2 text-sm">
                    <span>{selectedIds.length} selected</span>
                    <div className="flex gap-2">
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setBulkDeleteOpen(true)}
                            disabled={loading || bulkDeleting}
                        >
                            {bulkDeleting ? "Deleting..." : "Delete Selected"}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleExportSelected}
                            disabled={loading || bulkDeleting}
                        >
                            Export to CSV
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearSelection}
                            disabled={loading || bulkDeleting}
                        >
                            Clear
                        </Button>
                    </div>
                </div>
            )}

            {/* Content States */}
            {loading ? (
                <LoadingCard text="Loading orders..." />
            ) : orders?.length === 0 ? (
                <EmptyCard
                    title="No orders found"
                    message='Click the "Create Order" button to add your first order.'
                />
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <input
                                    type="checkbox"
                                    aria-label="Select all orders"
                                    checked={
                                        orders.length > 0 &&
                                        selectedIds.length === orders.length
                                    }
                                    onChange={toggleSelectAll}
                                />
                            </TableHead>
                            <TableHead>Order No</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Install Date</TableHead>
                            <TableHead>Issue Date</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>
                                    <input
                                        type="checkbox"
                                        aria-label={`Select order ${order.orderNo}`}
                                        checked={selectedIds.includes(order.id)}
                                        onChange={() => toggleSelectOne(order.id)}
                                    />
                                </TableCell>
                                <TableCell
                                    className="text-blue-600 cursor-pointer hover:underline"
                                    onClick={() => router.push(`/admin/order/${order.id}`)}
                                >
                                    {order.orderNo}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{order.customer?.name}</span>
                                        <span className="text-xs text-gray-500">{order.customer?.phone}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {order.installDate
                                        ? format(new Date(order.installDate), "PP")
                                        : "-"}
                                </TableCell>
                                <TableCell>
                                    {order.issueDate
                                        ? format(new Date(order.issueDate), "PP")
                                        : "-"}
                                </TableCell>
                                <TableCell>{order._count?.orderItems || 0}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleOpenDeleteModal(order)}
                                    >
                                        <MdDeleteForever />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {/* Delete Confirmation Dialog */}
            <ConfirmDeleteDialog
                open={deleteModalOpen}
                setOpen={setDeleteModalOpen}
                title="Delete Order"
                description={`Are you sure you want to delete “${selectedOrder?.orderNo}”? This action cannot be undone.`}
                onConfirm={handleConfirmDelete}
                loading={loading}
            />

            {/* Bulk delete dialog */}
            <ConfirmDeleteDialog
                open={bulkDeleteOpen}
                setOpen={setBulkDeleteOpen}
                title="Delete Selected Orders"
                description={`Are you sure you want to delete ${selectedIds.length} selected order(s)? This action cannot be undone.`}
                onConfirm={handleBulkDelete}
                loading={bulkDeleting}
                progressText={
                    bulkDeleting && selectedIds.length
                        ? `Deleting ${bulkCurrentIndex}/${selectedIds.length} orders...`
                        : ""
                }
            />
        </div>
    );
};

export default OrdersPage;