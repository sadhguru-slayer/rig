// app/projects/page.jsx
import ProjectsPage from '@/page_components/ProjectsPage'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export const metadata = {
  title: 'Our Projects - Invisible Grills',
  description: 'Browse through our completed projects and see how Invisible Grills has transformed spaces across different cities.',
}

const Projects = async () => {
  const projectsData = await prisma.project.findMany() || [];

  return <ProjectsPage projectsData={projectsData} />
}

export default Projects
