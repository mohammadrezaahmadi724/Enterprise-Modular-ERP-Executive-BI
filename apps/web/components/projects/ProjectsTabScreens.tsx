'use client';

import { ProjectsHubOverviewClient } from './ProjectsHubOverviewClient';
import { ProjectsListScreen } from './ProjectsListScreen';
import { ProjectsPersonalScreen } from './ProjectsPersonalScreen';
import { ProjectsRemindersScreen } from './ProjectsRemindersScreen';
import { ProjectsTasksScreen } from './ProjectsTasksScreen';
import { ProjectsOverdueScreen } from './ProjectsOverdueScreen';
import { ProjectsAssistantScreen } from './ProjectsAssistantScreen';
import { MasterDataHubScreen, MasterDataBrandingScreen } from './master-data/master-data-ui';
import {
  MasterDataPartiesScreen,
  MasterDataItemsScreen,
  MasterDataUnitsScreen,
  MasterDataTaxesScreen,
  MasterDataWarehousesScreen,
  MasterDataLocationsScreen,
  MasterDataCostCentersScreen,
  MasterDataPriceListsScreen,
} from './master-data/MasterDataScreens';

const MAP: Record<string, () => React.ReactNode> = {
  '/projects': ProjectsHubOverviewClient,
  '/projects/projects': ProjectsListScreen,
  '/projects/tasks': ProjectsTasksScreen,
  '/projects/reminders': ProjectsRemindersScreen,
  '/projects/personal': ProjectsPersonalScreen,
  '/projects/overdue': ProjectsOverdueScreen,
  '/projects/assistant': ProjectsAssistantScreen,
  '/projects/settings/master-data': MasterDataHubScreen,
  '/projects/settings/master-data/parties': MasterDataPartiesScreen,
  '/projects/settings/master-data/items': MasterDataItemsScreen,
  '/projects/settings/master-data/units': MasterDataUnitsScreen,
  '/projects/settings/master-data/taxes': MasterDataTaxesScreen,
  '/projects/settings/master-data/warehouses': MasterDataWarehousesScreen,
  '/projects/settings/master-data/locations': MasterDataLocationsScreen,
  '/projects/settings/master-data/cost-centers': MasterDataCostCentersScreen,
  '/projects/settings/master-data/price-lists': MasterDataPriceListsScreen,
  '/projects/settings/master-data/branding': MasterDataBrandingScreen,
};

export function renderProjectsScreen(href: string): React.ReactNode | null {
  const fn = MAP[href];
  return fn ? fn() : null;
}
