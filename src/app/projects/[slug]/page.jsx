import projectsData from '@/data/projects';
import { notFound } from 'next/navigation';
import ProjectDetails from '@/components/ProjectDetails';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The project you are looking for does not exist.",
    };
  }

  return {
    title: project.seo?.title || project.name,
    description: project.seo?.description || project.description?.slice(0, 160),
    keywords: project.seo?.keywords?.join(", "),
  };
}


export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}
