export type MasterDataResource =
  | 'parties'
  | 'items'
  | 'units'
  | 'taxes'
  | 'warehouses'
  | 'locations'
  | 'cost-centers'
  | 'price-lists';

/** مسیر API برای آرشیو (kebab-case در URL) */
export const ARCHIVE_API_SECTION: Partial<Record<MasterDataResource, string>> = {
  items: 'items',
  units: 'units',
  taxes: 'taxes',
  locations: 'locations',
  'price-lists': 'price-lists',
};

export function isMasterDataArchivable(resource: MasterDataResource): boolean {
  return Boolean(ARCHIVE_API_SECTION[resource]);
}
