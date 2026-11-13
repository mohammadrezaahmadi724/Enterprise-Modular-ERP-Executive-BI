import {
  createPersonalTask,
  createProject,
  createReminder,
  createTask,
  deletePersonalTask,
  getProjectContext,
  getProjectsAssistantInsights,
  getProjectsOverview,
  getTask,
  listPersonalTasks,
  listProjects,
  listReminders,
  listTasks,
  patchTask,
  projectsSource,
  togglePersonalTask,
  updateProjectStatus,
  updateTaskStatus,
} from '../../modules/projects/projects.service';

export {
  createPersonalTask,
  createProject,
  createReminder,
  createTask,
  deletePersonalTask,
  getProjectContext,
  getProjectsAssistantInsights,
  getProjectsOverview,
  getTask,
  listPersonalTasks,
  listProjects,
  listReminders,
  listTasks,
  patchTask,
  projectsSource,
  togglePersonalTask,
  updateProjectStatus,
  updateTaskStatus,
};

export async function createProjectCommand(body: Parameters<typeof createProject>[0]) {
  return { project: await createProject(body), source: projectsSource() };
}

export async function updateProjectStatusCommand(code: string, status: Parameters<typeof updateProjectStatus>[1]) {
  return { project: await updateProjectStatus(code, status), source: projectsSource() };
}

export async function createTaskCommand(body: Parameters<typeof createTask>[0]) {
  return { task: await createTask(body), source: projectsSource() };
}

export async function updateTaskStatusCommand(number: string, status: Parameters<typeof updateTaskStatus>[1]) {
  return { task: await updateTaskStatus(number, status), source: projectsSource() };
}

export async function patchTaskCommand(number: string, body: Parameters<typeof patchTask>[1]) {
  return { task: await patchTask(number, body), source: projectsSource() };
}
