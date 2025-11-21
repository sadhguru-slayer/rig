
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

const UsersPage = () => {
  const [Users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkCurrentIndex, setBulkCurrentIndex] = useState(0);
  const router = useRouter();

  // ✅ Fetch all Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/user");

      const data = await res.json();
      if (data.success) {
        setUsers(data.data || []);
      } else {
        toast.error(data.error || "Failed to fetch Users");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenDeleteModal = (User) => {
    setSelectedUser(User);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/user/${selectedUser.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("User deleted successfully!");
        setSelectedIds((prev) =>
          prev.filter((id) => id !== selectedUser.id)
        );
        await fetchUsers();
      } else {
        toast.error(data.error || "Failed to delete User");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  // selection helpers
  const toggleSelectAll = () => {
    if (selectedIds.length === Users.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(Users.map((u) => u.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
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
          const res = await fetch(`/api/admin/user/${id}`, {
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
        toast.error("Some users could not be deleted.");
      } else {
        toast.success("Selected users deleted successfully!");
      }

      setSelectedIds([]);
      await fetchUsers();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBulkDeleting(false);
      setBulkDeleteOpen(false);
    }
  };

  // export helpers
  const handleExportSelected = () => {
    const rows = Users.filter((u) => selectedIds.includes(u.id));
    if (!rows.length) return;

    const headers = ["ID", "Username", "Email", "Role", "Status", "Created At"];

    const escape = (val) => {
      const str = val == null ? "" : String(val);
      const escaped = str.replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const csv = [
      headers.join(","),
      ...rows.map((u) =>
        [
          escape(u.id),
          escape(u.username),
          escape(u.email),
          escape(u.isSuperUser ? "Superuser" : "Admin"),
          escape(u.isActive ? "Active" : "Inactive"),
          escape(
            u.createdAt ? new Date(u.createdAt).toLocaleDateString() : ""
          ),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-1 md:p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* Top Action Bar */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => router.push("/admin/user/create")}
        >
          Create User
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchUsers}
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
        <LoadingCard text="Loading Users..." />
      ) : Users?.length === 0 ? (
        <EmptyCard
          title="No Users found"
          message='Click the "Create User" button to add your first User.'
        />
      ) : (
        <Table className="overflow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead>
                <input
                  type="checkbox"
                  aria-label="Select all users"
                  checked={
                    Users.length > 0 && selectedIds.length === Users.length
                  }
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created On</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="">
            {Users.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    aria-label={`Select user ${admin.username}`}
                    checked={selectedIds.includes(admin.id)}
                    onChange={() => toggleSelectOne(admin.id)}
                  />
                </TableCell>

                {/* Username – Clickable to open admin details */}
                <TableCell
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => router.push(`/admin/user/${admin.id}`)}
                >
                  {admin.username}
                </TableCell>

                {/* Email */}
                <TableCell>{admin.email || "-"}</TableCell>

                {/* Role */}
                <TableCell>
                  {admin.isSuperUser ? (
                    <span className="text-purple-600 font-semibold">
                      Superuser
                    </span>
                  ) : (
                    <span className="text-gray-700">Admin</span>
                  )}
                </TableCell>

                {/* Active / Inactive */}
                <TableCell>
                  {admin.isActive ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Inactive
                    </span>
                  )}
                </TableCell>

                {/* Created date */}
                <TableCell>
                  {new Date(admin.createdAt).toLocaleDateString()}
                </TableCell>

                {/* Actions */}
                <TableCell className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => router.push(`/admin/user/${admin.id}`)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleOpenDeleteModal(admin)}
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
        title="Delete User"
        description={`Are you sure you want to delete “${selectedUser?.username}”? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        loading={loading}
      />

      {/* Bulk delete dialog */}
      <ConfirmDeleteDialog
        open={bulkDeleteOpen}
        setOpen={setBulkDeleteOpen}
        title="Delete Selected Users"
        description={`Are you sure you want to delete ${selectedIds.length} selected user(s)? This action cannot be undone.`}
        onConfirm={handleBulkDelete}
        loading={bulkDeleting}
        progressText={
          bulkDeleting && selectedIds.length
            ? `Deleting ${bulkCurrentIndex}/${selectedIds.length} users...`
            : ""
        }
      />
    </div>
  );
};

export default UsersPage;