import projectsData from '@/data/projects';
import { notFound } from 'next/navigation';
import ProjectDetails from '@/components/ProjectDetails';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      seo: true,
    },
  }) || [];

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
  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      challengesAndSolutions: true,
      seo: true,
      images:true
    },
  }) || [];


  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}
