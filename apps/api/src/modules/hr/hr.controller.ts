import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ModuleEntitlementGuard, RequireModule } from '@repo/module-sdk';
import {
  createPayslipDraftPrisma,
  hrPersistenceEnabled,
  listEmployeesPrisma,
  listPayslipsPrisma,
} from '@repo/db-erp-hr';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';

@Controller('api/v1/hr')
@UseGuards(TenantGuard, ModuleEntitlementGuard)
export class HrController {
  @Get('employees')
  @RequireModule('hr-base')
  @RequirePermission('hr.read')
  async employees() {
    if (hrPersistenceEnabled()) {
      return { employees: await listEmployeesPrisma(), persistence: 'prisma' };
    }
    return { employees: [], persistence: 'memory' };
  }

  @Get('payslips')
  @RequireModule('hr-base')
  @RequirePermission('hr.read')
  async payslips() {
    if (hrPersistenceEnabled()) {
      const rows = await listPayslipsPrisma();
      return {
        payslips: rows.map((p) => ({
          ...p,
          netPay: p.netPay.toString(),
          periodStart: p.periodStart.toISOString(),
          periodEnd: p.periodEnd.toISOString(),
        })),
      };
    }
    return { payslips: [] };
  }

  @Post('payslips/draft')
  @RequireModule('hr-base')
  @RequirePermission('hr.write')
  async createPayslip(
    @Body() body: { employeeId: string; netPay: number; baseSalary: number },
  ) {
    if (!hrPersistenceEnabled()) {
      return { ok: false, reason: 'HR_PERSISTENCE disabled' };
    }
    const row = await createPayslipDraftPrisma(body);
    return {
      payslip: {
        id: row.id,
        netPay: row.netPay.toString(),
        status: row.status,
      },
    };
  }
}
