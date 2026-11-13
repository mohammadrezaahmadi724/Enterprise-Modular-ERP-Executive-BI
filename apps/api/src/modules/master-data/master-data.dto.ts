import type { MasterDataSectionId } from '../../bridges/master-data-entitlements.bridge';

export type MasterDataEntitlementsDto = Record<MasterDataSectionId, boolean>;

export type MasterDataOverviewSectionDto = {
  id: MasterDataSectionId;
  countLabel: string;
  entitled: boolean;
  requiredModules: string[];
};

export type MasterDataOverviewDto = {
  sections: MasterDataOverviewSectionDto[];
  entitlements: MasterDataEntitlementsDto;
  links: {
    subscription: string;
    deepLinks: Record<string, string>;
  };
};

export type MasterDataListResponse<T> = {
  entitled: boolean;
  rows: T[];
  total: number;
  source: string;
  requiredModules?: string[];
  upgradeHref?: string;
};
