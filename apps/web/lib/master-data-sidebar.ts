/** مسیرهای فرزند اطلاعات پایه — هاب (`/projects/settings/master-data`) همیشه در منو می‌ماند */
export const MASTER_DATA_SECTION_HREFS: Record<string, string> = {
  parties: '/projects/settings/master-data/parties',
  items: '/projects/settings/master-data/items',
  units: '/projects/settings/master-data/units',
  taxes: '/projects/settings/master-data/taxes',
  warehouses: '/projects/settings/master-data/warehouses',
  locations: '/projects/settings/master-data/locations',
  costCenters: '/projects/settings/master-data/cost-centers',
  priceLists: '/projects/settings/master-data/price-lists',
  branding: '/projects/settings/master-data/branding',
};

export function masterDataHiddenMenuHrefs(entitlements: Record<string, boolean>): string[] {
  const hidden: string[] = [];
  for (const [sectionId, href] of Object.entries(MASTER_DATA_SECTION_HREFS)) {
    if (entitlements[sectionId] === false) hidden.push(href);
  }
  return hidden;
}
