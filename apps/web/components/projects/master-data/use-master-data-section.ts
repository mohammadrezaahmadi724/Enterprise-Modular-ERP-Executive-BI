'use client';

import { useEffect, useState } from 'react';
import {
  fetchMasterDataCostCenters,
  fetchMasterDataItems,
  fetchMasterDataLocations,
  fetchMasterDataParties,
  fetchMasterDataPriceLists,
  fetchMasterDataTaxes,
  fetchMasterDataUnits,
  fetchMasterDataWarehouses,
} from '../../../lib/projects-master-data-api';

import type { MasterDataResource } from '../../../lib/master-data-actions';
export type { MasterDataResource };

const FETCHERS = {
  parties: fetchMasterDataParties,
  items: fetchMasterDataItems,
  units: fetchMasterDataUnits,
  taxes: fetchMasterDataTaxes,
  warehouses: fetchMasterDataWarehouses,
  locations: fetchMasterDataLocations,
  'cost-centers': fetchMasterDataCostCenters,
  'price-lists': fetchMasterDataPriceLists,
} as const;

export function useMasterDataSection<T>(resource: MasterDataResource, fallbackRows: T[], fallbackTotal: number) {
  const [rows, setRows] = useState(fallbackRows);
  const [total, setTotal] = useState(fallbackTotal);
  const [source, setSource] = useState<string | null>(null);
  const [entitled, setEntitled] = useState(true);
  const [upgradeHref, setUpgradeHref] = useState<string | undefined>();
  const [requiredModules, setRequiredModules] = useState<string[] | undefined>();
  const [reloadToken, setReloadToken] = useState(0);

  const reload = () => setReloadToken((n) => n + 1);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await FETCHERS[resource]();
        if (cancelled) return;
        setEntitled(res.entitled);
        setUpgradeHref(res.upgradeHref);
        setRequiredModules(res.requiredModules);
        setTotal(res.total);
        setSource(res.source);
        if (res.entitled) setRows(res.rows.length ? (res.rows as T[]) : []);
      } catch {
        if (!cancelled) setSource(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [resource, reloadToken]);

  return { rows, total, source, entitled, upgradeHref, requiredModules, reload };
}
