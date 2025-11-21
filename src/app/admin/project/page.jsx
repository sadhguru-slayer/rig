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

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkCurrentIndex, setBulkCurrentIndex] = useState(0);
  const router = useRouter();

  // ✅ Fetch all projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/project");
      const data = await res.json();
      if (data.success) {
        setProjects(data.data || []);
      } else {
        toast.error(data.error || "Failed to fetch projects");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenDeleteModal = (project) => {
    setSelectedProject(project);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProject) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/project/${selectedProject.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Project deleted successfully!");
        setSelectedIds((prev) =>
          prev.filter((id) => id !== selectedProject.id)
        );
        await fetchProjects();
      } else {
        toast.error(data.error || "Failed to delete project");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setDeleteModalOpen(false);
      setSelectedProject(null);
    }
  };

  // selection helpers
  const toggleSelectAll = () => {
    if (selectedIds.length === projects.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(projects.map((p) => p.id));
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
          const res = await fetch(`/api/admin/project/${id}`, {
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
        toast.error("Some projects could not be deleted.");
      } else {
        toast.success("Selected projects deleted successfully!");
      }

      setSelectedIds([]);
      await fetchProjects();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBulkDeleting(false);
      setBulkDeleteOpen(false);
    }
  };

  // export helpers
  const handleExportSelected = () => {
    const rows = projects.filter((p) => selectedIds.includes(p.id));
    if (!rows.length) return;

    const headers = ["ID", "Name", "Client", "Location", "Completed On"];

    const escape = (val) => {
      const str = val == null ? "" : String(val);
      const escaped = str.replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const csv = [
      headers.join(","),
      ...rows.map((p) =>
        [
          escape(p.id),
          escape(p.name),
          escape(p.client),
          escape(p.location),
          escape(
            p.completedOn
              ? new Date(p.completedOn).toLocaleDateString()
              : ""
          ),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "projects.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-1 md:p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      {/* Top Action Bar */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => router.push("/admin/project/create")}
        >
          Create Project
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchProjects}
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
        <LoadingCard text="Loading projects..." />
      ) : projects?.length === 0 ? (
        <EmptyCard
          title="No projects found"
          message='Click the "Create Project" button to add your first project.'
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <input
                  type="checkbox"
                  aria-label="Select all projects"
                  checked={
                    projects.length > 0 &&
                    selectedIds.length === projects.length
                  }
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Completed On</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    aria-label={`Select project ${project.name}`}
                    checked={selectedIds.includes(project.id)}
                    onChange={() => toggleSelectOne(project.id)}
                  />
                </TableCell>
                <TableCell
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => router.push(`/admin/project/${project.id}`)}
                >
                  {project.name}
                </TableCell>
                <TableCell>{project.client || "-"}</TableCell>
                <TableCell>{project.location || "-"}</TableCell>
                <TableCell>
                  {project.completedOn
                    ? new Date(project.completedOn).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleOpenDeleteModal(project)}
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
        description={`Are you sure you want to delete “${selectedProject?.name}”? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        loading={loading}
      />

      {/* Bulk delete dialog */}
      <ConfirmDeleteDialog
        open={bulkDeleteOpen}
        setOpen={setBulkDeleteOpen}
        title="Delete Selected Projects"
        description={`Are you sure you want to delete ${selectedIds.length} selected project(s)? This action cannot be undone.`}
        onConfirm={handleBulkDelete}
        loading={bulkDeleting}
        progressText={
          bulkDeleting && selectedIds.length
            ? `Deleting ${bulkCurrentIndex}/${selectedIds.length} projects...`
            : ""
        }
      />
    </div>
  );
};

export default ProjectsPage;