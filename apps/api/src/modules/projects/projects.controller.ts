import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ModuleEntitlementGuard, RequireModule } from '@repo/module-sdk';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';
import type { CreateProjectBody, CreateReminderBody, CreateTaskBody, PatchTaskBody, ProjectStatus, TaskStatus } from './projects.dto';
import {
  createPersonalTask,
  createProjectCommand,
  createReminder,
  createTaskCommand,
  deletePersonalTask,
  getProjectContext,
  getProjectsAssistantInsights,
  getTask,
  getProjectsOverview,
  listPersonalTasks,
  listProjects,
  listReminders,
  listTasks,
  patchTaskCommand,
  projectsSource,
  togglePersonalTask,
  updateProjectStatusCommand,
  updateTaskStatusCommand,
} from '../../application/projects/projects.handlers';

@Controller('api/v1/projects')
@UseGuards(TenantGuard, ModuleEntitlementGuard)
export class ProjectsController {
  @Get('assistant/insights')
  @RequireModule('projects-base')
  @RequirePermission('operations.read')
  async assistantInsights() {
    const assistant = await getProjectsAssistantInsights();
    return { assistant, source: projectsSource() };
  }

  @Get('overview')
  @RequireModule('projects-base')
  @RequirePermission('operations.read')
  async overview() {
    const data = await getProjectsOverview();
    return { ...data, source: projectsSource() };
  }

  @Get('list')
  @RequireModule('projects-base')
  @RequirePermission('operations.read')
  async projects() {
    return { projects: await listProjects(), source: projectsSource() };
  }

  @Post('list')
  @RequireModule('projects-base')
  @RequirePermission('operations.write')
  async create(@Body() body: CreateProjectBody) {
    return createProjectCommand(body);
  }

  @Get('list/:code/context')
  @RequireModule('projects-base')
  @RequirePermission('operations.read')
  async projectContext(@Param('code') code: string) {
    const context = await getProjectContext(decodeURIComponent(code));
    return { context, source: projectsSource() };
  }

  @Patch('list/:code/status')
  @RequireModule('projects-base')
  @RequirePermission('operations.write')
  async patchProjectStatus(@Param('code') code: string, @Body() body: { status: ProjectStatus }) {
    return updateProjectStatusCommand(decodeURIComponent(code), body.status);
  }

  @Get('tasks')
  @RequireModule('projects-base')
  @RequirePermission('operations.read')
  async tasks() {
    return { tasks: await listTasks(), source: projectsSource() };
  }

  @Post('tasks')
  @RequireModule('projects-base')
  @RequirePermission('operations.write')
  async createTask(@Body() body: CreateTaskBody) {
    return createTaskCommand(body);
  }

  @Get('tasks/:number')
  @RequireModule('projects-base')
  @RequirePermission('operations.read')
  async taskDetail(@Param('number') number: string) {
    return { task: await getTask(decodeURIComponent(number)), source: projectsSource() };
  }

  @Patch('tasks/:number/status')
  @RequireModule('projects-base')
  @RequirePermission('operations.write')
  async patchTaskStatus(@Param('number') number: string, @Body() body: { status: TaskStatus }) {
    return updateTaskStatusCommand(decodeURIComponent(number), body.status);
  }

  @Patch('tasks/:number')
  @RequireModule('projects-base')
  @RequirePermission('operations.write')
  async patchTaskHandler(@Param('number') number: string, @Body() body: PatchTaskBody) {
    return patchTaskCommand(decodeURIComponent(number), body);
  }

  @Get('reminders')
  @RequireModule('projects-base')
  @RequirePermission('operations.read')
  async reminders() {
    return { reminders: await listReminders(), source: projectsSource() };
  }

  @Post('reminders')
  @RequireModule('projects-base')
  @RequirePermission('operations.write')
  async createReminder(@Body() body: CreateReminderBody) {
    return { reminder: await createReminder(body), source: projectsSource() };
  }

  @Get('personal-tasks')
  @RequireModule('projects-base')
  @RequirePermission('operations.read')
  async personal() {
    return { tasks: await listPersonalTasks(), source: projectsSource() };
  }

  @Post('personal-tasks')
  @RequireModule('projects-base')
  @RequirePermission('operations.write')
  async addPersonal(@Body() body: { title: string }) {
    return { task: await createPersonalTask(body.title), source: projectsSource() };
  }

  @Post('personal-tasks/:id/toggle')
  @RequireModule('projects-base')
  @RequirePermission('operations.write')
  async togglePersonal(@Param('id') id: string) {
    return { task: await togglePersonalTask(decodeURIComponent(id)), source: projectsSource() };
  }

  @Delete('personal-tasks/:id')
  @RequireModule('projects-base')
  @RequirePermission('operations.write')
  async removePersonal(@Param('id') id: string) {
    await deletePersonalTask(decodeURIComponent(id));
    return { ok: true, source: projectsSource() };
  }
}
