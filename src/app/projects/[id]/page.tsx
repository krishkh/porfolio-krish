import { notFound } from "next/navigation";
import { getProjectById, projects } from "@/data/projects";
import ProjectDetailComponent from "@/components/ProjectDetail/ProjectDetail";

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const projectId = parseInt(id);
  const project = getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return <ProjectDetailComponent project={project} />;
}

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}
