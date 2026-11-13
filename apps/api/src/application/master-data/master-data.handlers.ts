import type { MasterDataSectionId } from '../../bridges/master-data-entitlements.bridge';
import {
  archiveMasterDataSectionRecord,
  getMasterDataBranding,
  getMasterDataCostCenters,
  getMasterDataItems,
  getMasterDataLocations,
  getMasterDataOverview,
  getMasterDataParties,
  getMasterDataPriceLists,
  getMasterDataTaxes,
  getMasterDataUnits,
  getMasterDataWarehouses,
  patchMasterDataBranding,
  uploadMasterDataBrandingSlot,
} from '../../modules/master-data/master-data.service';
import type { BrandingSlot } from '../../storage/tenant-object-storage.service';

export {
  getMasterDataBranding,
  getMasterDataCostCenters,
  getMasterDataItems,
  getMasterDataLocations,
  getMasterDataOverview,
  getMasterDataParties,
  getMasterDataPriceLists,
  getMasterDataTaxes,
  getMasterDataUnits,
  getMasterDataWarehouses,
};

export async function patchBrandingCommand(body: { logoUrl?: string; stampUrl?: string; signatureUrl?: string }) {
  return patchMasterDataBranding(body);
}

export async function uploadBrandingCommand(slot: BrandingSlot, file: Express.Multer.File, ip?: string) {
  return uploadMasterDataBrandingSlot(slot, file, ip);
}

export async function archiveMasterRecordCommand(section: MasterDataSectionId, code: string) {
  return archiveMasterDataSectionRecord(section, code);
}
