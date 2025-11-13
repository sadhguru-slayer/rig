"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { TbMoodEmptyFilled } from "react-icons/tb";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { SlReload } from "react-icons/sl";
import { useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";

const AdminBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const router = useRouter();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data || []);
      } else {
        toast.error(data.error || "Failed to fetch blogs");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenDeleteModal = (blog) => {
    setBlogToDelete(blog);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!blogToDelete) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/blog/${blogToDelete.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Blog deleted successfully!");
        fetchBlogs();
      } else {
        toast.error(data.error || "Failed to delete blog");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
      setDeleteModalOpen(false);
      setBlogToDelete(null);
    }
  };

  return (
    <div className="p-1 md:p-4">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>

      <div className="flex items-center justify-between mb-4">
        <Button variant="default" size="sm" onClick={() => router.push("/admin/blog/create")}>
          Create Blog
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchBlogs}
          disabled={loading}
          className={loading ? "cursor-not-allowed" : ""}
        >
          <SlReload
            className="transition-transform"
            style={{ animation: loading ? "spin-reverse 1s linear infinite" : "none" }}
          />
        </Button>
      </div>

      {loading ? (
        <Card className="w-full max-w-md mx-auto mt-8 border border-gray-200 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
            <Spinner className="h-8 w-8 text-blue-600" />
            <CardTitle className="text-lg font-medium text-gray-700">Loading blogs...</CardTitle>
          </CardContent>
        </Card>
      ) : blogs?.length === 0 ? (
        <Card className="w-full max-w-md mx-auto mt-8 border border-gray-200 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
            <TbMoodEmptyFilled className="h-8 w-8 text-gray-400" />
            <CardTitle className="text-lg font-medium text-gray-700">No blogs found</CardTitle>
            <p className="text-gray-500 text-sm text-center">
              Click the {`"Create Blog"`} button to add your first blog.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Created On</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => router.push(`/admin/blog/${blog.id}`)}
                >
                  {blog.title}
                </TableCell>
                <TableCell>{blog.author || "-"}</TableCell>
                <TableCell>{blog.published ? "✅ Yes" : "❌ No"}</TableCell>
                <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm" onClick={() => handleOpenDeleteModal(blog)}>
                    <MdDeleteForever/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete “{blogToDelete?.title}”? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlogsPage;
