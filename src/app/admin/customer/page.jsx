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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { SlReload } from "react-icons/sl";
import { toast } from "sonner";
import EmptyCard from "@/components/ui/EmptyCard";
import ConfirmDeleteDialog from "@/components/ui/ConfirmDeleteDialog";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkCurrentIndex, setBulkCurrentIndex] = useState(0);
  const router = useRouter();

  // ✅ Fetch all customers
  const fetchcustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/customer");
      const data = await res.json();
      if (data.success) {
        setCustomers(data.data || []);
      } else {
        toast.error(data.error || "Failed to fetch customers");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchcustomers();
  }, []);

  const handleOpenDeleteModal = (customer) => {
    setSelectedCustomers(customer);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCustomers) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/customer/${selectedCustomers.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Project deleted successfully!");
        setSelectedIds((prev) =>
          prev.filter((id) => id !== selectedCustomers.id)
        );
        await fetchcustomers();
      } else {
        toast.error(data.error || "Failed to delete customer");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setDeleteModalOpen(false);
      setSelectedCustomers(null);
    }
  };

  // selection helpers
  const toggleSelectAll = () => {
    if (selectedIds.length === customers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(customers.map((c) => c.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
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
          const res = await fetch(`/api/admin/customer/${id}`, {
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
        toast.error("Some customers could not be deleted.");
      } else {
        toast.success("Selected customers deleted successfully!");
      }

      setSelectedIds([]);
      await fetchcustomers();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBulkDeleting(false);
      setBulkDeleteOpen(false);
    }
  };

  // export helpers
  const handleExportSelected = () => {
    const rows = customers.filter((c) => selectedIds.includes(c.id));
    if (!rows.length) return;

    const headers = ["ID", "Name", "Phone", "Email", "Created At"];

    const escape = (val) => {
      const str = val == null ? "" : String(val);
      const escaped = str.replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const csv = [
      headers.join(","),
      ...rows.map((c) =>
        [
          escape(c.id),
          escape(c.name),
          escape(c.phone),
          escape(c.email),
          escape(
            c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ""
          ),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "customers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-1 md:p-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      {/* Top Action Bar */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => router.push("/admin/customer/create")}
        >
          Create Project
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchcustomers}
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
        <LoadingCard text="Loading customers..." />
      ) : customers?.length === 0 ? (
        <EmptyCard
          title="No customers found"
          message='Click the "Create Project" button to add your first customer.'
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <input
                  type="checkbox"
                  aria-label="Select all customers"
                  checked={
                    customers.length > 0 &&
                    selectedIds.length === customers.length
                  }
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    aria-label={`Select customer ${customer.name}`}
                    checked={selectedIds.includes(customer.id)}
                    onChange={() => toggleSelectOne(customer.id)}
                  />
                </TableCell>

                <TableCell>{customer.id || "-"}</TableCell>

                <TableCell
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => router.push(`/admin/customer/${customer.id}`)}
                >
                  {customer.name}
                </TableCell>
                <TableCell>{customer.phone || "-"}</TableCell>
                <TableCell>{customer.email || "-"}</TableCell>
                <TableCell>
                  {customer.createdAt
                    ? new Date(customer.createdAt).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleOpenDeleteModal(customer)}
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
        title="Delete Project"
        description={`Are you sure you want to delete “${selectedCustomers?.name}”? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        loading={loading}
      />

      {/* Bulk delete dialog */}
      <ConfirmDeleteDialog
        open={bulkDeleteOpen}
        setOpen={setBulkDeleteOpen}
        title="Delete Selected Customers"
        description={`Are you sure you want to delete ${selectedIds.length} selected customer(s)? This action cannot be undone.`}
        onConfirm={handleBulkDelete}
        loading={bulkDeleting}
        progressText={
          bulkDeleting && selectedIds.length
            ? `Deleting ${bulkCurrentIndex}/${selectedIds.length} customers...`
            : ""
        }
      />
    </div>
  );
};

export default CustomersPage;