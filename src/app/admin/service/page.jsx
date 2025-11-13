"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { SlReload } from "react-icons/sl";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { TbMoodEmptyFilled } from "react-icons/tb";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner"; // ShadCN spinner



const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form fields exactly as in your Prisma model
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
const [serviceToDelete, setServiceToDelete] = useState(null);

// Open modal instead of confirm
const handleOpenDeleteModal = (id) => {
  setServiceToDelete(id);
  setDeleteModalOpen(true);
};

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/service/");
      const data = await res.json();
      if (data.success) {
        setServices(data.data || []);

      } else {
        setError(data.error || "Failed to fetch data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {


  fetchServices();
}, []);


const handleConfirmDelete = async () => {
  if (!serviceToDelete) return;

  setLoading(true); // start loading

  try {
    const res = await fetch(`/api/admin/service/${serviceToDelete}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data.success) {
      setSuccess("Service deleted successfully!");
      toast.success("Service deleted successfully!")
      fetchServices();
      setError("");
    } else {
      setError(data.error || "Failed to delete service");
      toast.error(data.error)
      setSuccess("");
    }
  } catch (err) {
    setError(err.message);
      toast.error(err.message);

    setSuccess("");
  } finally {
    setLoading(false); // stop loading
    setDeleteModalOpen(false);
    setServiceToDelete(null);
  }
};



  return (
    <div className="p-2 md:p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Services Page</h1>

<div className="mt-6 p-2 md:p-4">
  <div className="flex items-center justify-between mb-2">
    <h2 className="font-semibold">Existing Services</h2>

    <div className="flex gap-2">
      {/* Reload Button */}
      <Button
  variant="outline"
  type="button"
  size="sm"
  onClick={fetchServices}
  disabled={loading} // disable while loading
  className={loading ? "cursor-not-allowed" : ""}
>
  <SlReload
  className="transition-transform"
  style={{
    animation: loading ? "spin-reverse 1s linear infinite" : "none",
  }}
/>

</Button>

      {/* Create Service Button */}
      <Button variant="default" type='button'  size="sm" onClick={() => (window.location.href = "/admin/service/create")}>
        Create Service
      </Button>
    </div>
  </div>

  {loading ? (
  <Card className="w-full max-w-md mx-auto mt-8 border border-gray-200 shadow-sm">
    <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
      <Spinner className="h-8 w-8 text-blue-600" />
      <CardTitle className="text-lg font-medium text-gray-700">
        Loading services...
      </CardTitle>
    </CardContent>
  </Card>
) : services?.length === 0 ? (
  <Card className="w-full max-w-md mx-auto mt-8 border border-gray-200 shadow-sm">
    <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
      <TbMoodEmptyFilled  className="h-8 w-8 text-gray-400" />
      <CardTitle className="text-lg font-medium text-gray-700">
        No services found
      </CardTitle>
      <p className="text-gray-500 text-sm text-center">
        Click the {`"Create Service"`} button to add your first service.
      </p>
    </CardContent>
  </Card>
) : (
    <Table>
      <TableHeader>
        <TableRow>
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
              <Link
                href={`/admin/service/${service.id}`}
                className="text-teal-500 hover:underline"
              >
                {service.title}
              </Link>
            </TableCell>
            <TableCell>{service.slug}</TableCell>
            <TableCell>{service.shortTitle}</TableCell>
            <TableCell>
              <Button variant="destructive" onClick={() => handleOpenDeleteModal(service.id)}>
  <MdDeleteForever />
</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )}
</div>

<Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle> Delete Service </DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this service? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="flex justify-end gap-2">
  <Button
    className="cursor-pointer"
    variant="outline"
    onClick={() => setDeleteModalOpen(false)}
    disabled={loading} // disable while loading
  >
    Cancel
  </Button>
  <Button
    className="cursor-pointer"
    variant="destructive"
    onClick={handleConfirmDelete}
    disabled={loading} // disable while loading
  >
    {loading ? "Deleting..." : "Delete"}
  </Button>
</DialogFooter>

  </DialogContent>
</Dialog>
    </div>
  );
};

export default AdminServicesPage;