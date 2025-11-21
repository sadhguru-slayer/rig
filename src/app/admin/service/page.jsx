"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
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
import { SlReload } from "react-icons/sl";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "sonner";
import LoadingCard from "@/components/ui/LoadingCard";
import EmptyCard from "@/components/ui/EmptyCard";
import ConfirmDeleteDialog from "@/components/ui/ConfirmDeleteDialog";

const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkCurrentIndex, setBulkCurrentIndex] = useState(0);

  const router = useRouter();

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/service");
      const data = await res.json();
      if (data.success) {
        setServices(data.data || []);
      } else {
        toast.error(data.error || "Failed to fetch services");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // single delete
  const handleOpenDeleteModal = (id) => {
    setServiceToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/service/${serviceToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Service deleted successfully!");
        setSelectedIds((prev) => prev.filter((sid) => sid !== serviceToDelete));
        await fetchServices();
      } else {
        toast.error(data.error || "Failed to delete service");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
      setDeleteModalOpen(false);
      setServiceToDelete(null);
    }
  };

  // selection helpers
  const toggleSelectAll = () => {
    if (selectedIds.length === services.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(services.map((s) => s.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
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
          const res = await fetch(`/api/admin/service/${id}`, {
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
        toast.error("Some services could not be deleted.");
      } else {
        toast.success("Selected services deleted successfully!");
      }

      setSelectedIds([]);
      await fetchServices();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBulkDeleting(false);
      setBulkDeleteOpen(false);
    }
  };

  // export helpers
  const handleExportSelected = () => {
    const rows = services.filter((s) => selectedIds.includes(s.id));
    if (!rows.length) return;

    const headers = ["ID", "Title", "Slug", "Short Title"];

    const escape = (val) => {
      const str = val == null ? "" : String(val);
      const escaped = str.replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const csv = [
      headers.join(","),
      ...rows.map((s) =>
        [
          escape(s.id),
          escape(s.title),
          escape(s.slug),
          escape(s.shortTitle),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "services.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-1 md:p-4">
      <h1 className="text-2xl font-bold mb-4">Services</h1>

      {/* Top Action Bar */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => router.push("/admin/service/create")}
        >
          Create Service
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchServices}
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
        <LoadingCard text="Loading services..." />
      ) : services?.length === 0 ? (
        <EmptyCard
          title="No services found"
          message='Click the "Create Service" button to add your first service.'
        />
      ) : (
        <Table className="overflow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead>
                <input
                  type="checkbox"
                  aria-label="Select all services"
                  checked={
                    services.length > 0 &&
                    selectedIds.length === services.length
                  }
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Short Title</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    aria-label={`Select service ${service.title}`}
                    checked={selectedIds.includes(service.id)}
                    onChange={() => toggleSelectOne(service.id)}
                  />
                </TableCell>
                <TableCell>
                  <Link
                    href={`/admin/service/${service.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {service.title}
                  </Link>
                </TableCell>
                <TableCell>{service.slug}</TableCell>
                <TableCell>{service.shortTitle}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => router.push(`/admin/service/${service.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleOpenDeleteModal(service.id)}
                  >
                    <MdDeleteForever />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Single delete dialog */}
      <ConfirmDeleteDialog
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        loading={loading}
      />

      {/* Bulk delete dialog */}
      <ConfirmDeleteDialog
        open={bulkDeleteOpen}
        setOpen={setBulkDeleteOpen}
        title="Delete Selected Services"
        description={`Are you sure you want to delete ${selectedIds.length} selected service(s)? This action cannot be undone.`}
        onConfirm={handleBulkDelete}
        loading={bulkDeleting}
        progressText={
          bulkDeleting && selectedIds.length
            ? `Deleting ${bulkCurrentIndex}/${selectedIds.length} services...`
            : ""
        }
      />
    </div>
  );
};

export default AdminServicesPage;
