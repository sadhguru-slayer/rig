import projectsData from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectDetails from "@/components/ProjectDetails";

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}
