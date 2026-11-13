import {
  type AdminResource,
  createAdminResource,
  deleteAdminResource,
  listAdminResource,
  updateAdminResource,
} from '../../modules/platform/platform-admin.service';

export type { AdminResource };

export async function listAdminResourceQuery(resource: AdminResource, q?: string) {
  return { rows: await listAdminResource(resource, q) };
}

export async function createAdminResourceCommand(resource: AdminResource, body: Record<string, unknown>) {
  return { row: await createAdminResource(resource, body) };
}

export async function updateAdminResourceCommand(
  resource: AdminResource,
  id: string,
  body: Record<string, unknown>,
) {
  return { row: await updateAdminResource(resource, id, body) };
}

export async function deleteAdminResourceCommand(resource: AdminResource, id: string) {
  return deleteAdminResource(resource, id);
}
