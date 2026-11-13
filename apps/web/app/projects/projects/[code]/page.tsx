import { ProjectsContextScreen } from '../../../../components/projects/ProjectsContextScreen';

export default async function ProjectContextPage({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams?: Promise<{ quickPr?: string }>;
}) {
  const { code } = await params;
  const sp = searchParams ? await searchParams : undefined;
  return (
    <ProjectsContextScreen
      projectCode={decodeURIComponent(code)}
      openQuickPr={sp?.quickPr === '1'}
    />
  );
}
