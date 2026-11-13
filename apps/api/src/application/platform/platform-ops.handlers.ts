import { getPlatformOpsSnapshot, getProdRuntimeStatus } from '../../modules/platform/platform-ops.service';

export function platformOpsMonitorQuery() {
  return getPlatformOpsSnapshot();
}

export function platformRuntimeQuery() {
  return getProdRuntimeStatus();
}
