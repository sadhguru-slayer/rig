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
        fetchProjects();
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
    </div>
  );
};

export default ProjectsPage;