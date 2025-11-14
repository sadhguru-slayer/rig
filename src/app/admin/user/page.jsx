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
        fetchUsers();
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
            <span className="text-purple-600 font-semibold">Superuser</span>
          ) : (
            <span className="text-gray-700">Admin</span>
          )}
        </TableCell>

        {/* Active / Inactive */}
        <TableCell>
          {admin.isActive ? (
            <span className="text-green-600 font-semibold">Active</span>
          ) : (
            <span className="text-red-600 font-semibold">Inactive</span>
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
    </div>
  );
};

export default UsersPage;