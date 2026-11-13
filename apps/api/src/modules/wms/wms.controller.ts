import { Body, Controller, Get, Param, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { ModuleEntitlementGuard, RequireModule } from '@repo/module-sdk';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';
import type {
  CreateAdjustmentBody,
  CreateReservationBody,
  CreateStockDocBody,
  CreateBatchBody,
  CreateStocktakingBody,
  RegisterSerialsBody,
  UpdateStocktakingLineBody,
} from './wms.dto';
import {
  adjustWmsStockCommand,
  createBatch,
  createReceipt,
  createReservation,
  createStocktakingSession,
  createTransfer,
  createWmsIssueCommand,
  getDocument,
  getKardex,
  getOverview,
  getReservation,
  getSerialNumbers,
  getStocktakingSession,
  getTrackingContracts,
  getValuationReconciliation,
  getValuationReconciliationCsv,
  listBatches,
  listExpiringBatches,
  listIssues,
  listReceipts,
  listReconciliations,
  listReservations,
  listStock,
  listStocktakingSessions,
  listTransfers,
  postStocktakingSession,
  registerSerialNumbers,
  runBatchExpiry,
  runReconciliation,
  runWmsExpiryMaintenance,
  suggestFefoPick,
  updateStocktakingLine,
  wmsSource,
  wmsTrackingSource,
} from '../../application/wms/wms.handlers';

type ReqUser = { headers: Record<string, string | string[] | undefined> };

function approverUserId(req: ReqUser): string {
  const raw = req.headers['x-user-id'];
  if (typeof raw === 'string' && raw.length > 0) return raw;
  return '00000000-0000-4000-8000-000000000001';
}

@Controller('api/v1/wms')
@UseGuards(TenantGuard, ModuleEntitlementGuard)
export class WmsController {
  @Get('overview')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async overview() {
    return { overview: await getOverview(), source: wmsSource() };
  }

  @Get('stock')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async stock() {
    return { stock: await listStock(), source: wmsSource() };
  }

  @Get('reservations')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async reservations() {
    return { reservations: await listReservations(), source: wmsSource() };
  }

  @Get('reservations/:id')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async reservation(@Param('id') id: string) {
    const reservation = await getReservation(decodeURIComponent(id));
    return { reservation, source: wmsSource() };
  }

  @Post('reservations')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async createReservationHandler(@Body() body: CreateReservationBody) {
    const reservation = await createReservation(body);
    return { reservation, source: wmsSource() };
  }

  @Get('receipts')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async receipts() {
    return { receipts: await listReceipts(), source: wmsSource() };
  }

  @Post('receipts')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async createReceiptHandler(@Body() body: CreateStockDocBody, @Req() req: ReqUser) {
    const receipt = await createReceipt(body, approverUserId(req));
    return { receipt, source: wmsSource() };
  }

  @Get('issues')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async issues() {
    return { issues: await listIssues(), source: wmsSource() };
  }

  @Post('issues')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async createIssueHandler(@Body() body: CreateStockDocBody, @Req() req: ReqUser) {
    return createWmsIssueCommand(body, approverUserId(req));
  }

  @Get('transfers')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async transfers() {
    return { transfers: await listTransfers(), source: wmsSource() };
  }

  @Post('transfers')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async createTransferHandler(@Body() body: CreateStockDocBody) {
    const transfer = await createTransfer(body);
    return { transfer, source: wmsSource() };
  }

  @Post('adjustments')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async adjustment(@Body() body: CreateAdjustmentBody, @Req() req: ReqUser) {
    return adjustWmsStockCommand(body, approverUserId(req));
  }

  @Get('reconciliation')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async reconciliationList() {
    return { sessions: await listReconciliations(), source: wmsSource() };
  }

  @Post('reconciliation/run')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async reconciliationRun() {
    const session = await runReconciliation();
    return { session, source: wmsSource() };
  }

  @Get('documents/:docNo')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async document(@Param('docNo') docNo: string) {
    const document = await getDocument(decodeURIComponent(docNo));
    return { document, source: wmsSource() };
  }

  @Get('kardex')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async kardex() {
    return { kardex: await getKardex(), source: wmsSource() };
  }

  @Get('reports/valuation-reconciliation')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async valuationReconciliation() {
    return { reconciliation: await getValuationReconciliation(), source: 'projection_wms_valuation' };
  }

  @Get('reports/valuation-reconciliation/export')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async valuationReconciliationExport(@Res() res: Response) {
    const csv = await getValuationReconciliationCsv();
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="wms-valuation-reconciliation.csv"');
    res.send(csv);
  }

  @Get('stocktaking')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async stocktakingList() {
    return { sessions: await listStocktakingSessions(), source: wmsSource() };
  }

  @Get('stocktaking/:id')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async stocktakingOne(@Param('id') id: string) {
    const session = await getStocktakingSession(decodeURIComponent(id));
    return { session, source: wmsSource() };
  }

  @Post('stocktaking')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async stocktakingCreate(@Body() body: CreateStocktakingBody) {
    const session = await createStocktakingSession(body);
    return { session, source: wmsSource() };
  }

  @Patch('stocktaking/:id/lines')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async stocktakingUpdateLine(@Param('id') id: string, @Body() body: UpdateStocktakingLineBody) {
    const session = await updateStocktakingLine(decodeURIComponent(id), body);
    return { session, source: wmsSource() };
  }

  @Post('stocktaking/:id/post')
  @RequireModule('operations-base')
  @RequirePermission('finance.write')
  async stocktakingPost(@Param('id') id: string, @Req() req: ReqUser) {
    const session = await postStocktakingSession(decodeURIComponent(id), approverUserId(req));
    return { session, source: wmsSource() };
  }

  @Get('tracking')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async trackingList() {
    return { contracts: await getTrackingContracts(), source: wmsTrackingSource() };
  }

  @Get('serials')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async serialsList() {
    return { serials: await getSerialNumbers(), source: wmsTrackingSource() };
  }

  @Post('serials')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async serialsRegister(@Body() body: RegisterSerialsBody) {
    const result = await registerSerialNumbers(body);
    return { ...result, source: wmsTrackingSource() };
  }

  @Get('batches')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async batchesList() {
    return { batches: await listBatches(true), source: wmsSource() };
  }

  @Get('batches/expiring')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async batchesExpiring(@Query('withinDays') withinDays?: string) {
    const days = withinDays !== undefined && withinDays !== '' ? Number(withinDays) : 30;
    const within = Number.isFinite(days) && days > 0 ? Math.min(days, 365) : 30;
    return {
      batches: await listExpiringBatches(within, true),
      withinDays: within,
      source: wmsSource(),
    };
  }

  @Get('batches/fefo-pick')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async batchesFefoPick(
    @Query('sku') sku?: string,
    @Query('warehouse') warehouse?: string,
    @Query('qty') qty?: string,
  ) {
    const quantity = qty !== undefined && qty !== '' ? Number(qty) : NaN;
    return {
      pick: await suggestFefoPick(sku ?? '', warehouse ?? '', quantity),
      source: wmsSource(),
    };
  }

  @Post('batches')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async batchesCreate(@Body() body: CreateBatchBody) {
    const batch = await createBatch(body);
    return { batch, source: wmsSource() };
  }

  @Post('batches/expire-run')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async batchesExpire() {
    const result = await runBatchExpiry();
    return { ...result, source: wmsSource() };
  }

  @Post('batches/expiry-scan')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async batchesExpiryScan(@Query('withinDays') withinDays?: string) {
    const days = withinDays !== undefined && withinDays !== '' ? Number(withinDays) : 30;
    const within = Number.isFinite(days) && days > 0 ? Math.min(days, 365) : 30;
    const result = await runWmsExpiryMaintenance(within);
    return { ...result, withinDays: within, source: wmsSource() };
  }
}
