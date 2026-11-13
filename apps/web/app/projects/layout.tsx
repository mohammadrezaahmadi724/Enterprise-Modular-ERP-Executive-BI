import type { Metadata } from 'next';
import { ProjectsModuleShell } from '../../components/projects/ProjectsModuleShell';

export const metadata: Metadata = {
  title: 'پروژه‌ها',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <ProjectsModuleShell>{children}</ProjectsModuleShell>;
}
