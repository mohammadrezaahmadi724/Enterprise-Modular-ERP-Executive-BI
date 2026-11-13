import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ModuleEntitlementGuard, RequireModule } from '@repo/module-sdk';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';
import {
  createPayslipDraftCommand,
  finalizePayslipCommand,
  listEmployeesQuery,
  listPayslipsQuery,
} from '../../application/hr/hr.handlers';

@Controller('api/v1/hr')
@UseGuards(TenantGuard, ModuleEntitlementGuard)
export class HrController {
  @Get('employees')
  @RequireModule('hr-base')
  @RequirePermission('hr.read')
  employees() {
    return listEmployeesQuery();
  }

  @Get('payslips')
  @RequireModule('hr-base')
  @RequirePermission('hr.read')
  payslips() {
    return listPayslipsQuery();
  }

  @Post('payslips/draft')
  @RequireModule('hr-base')
  @RequirePermission('hr.write')
  createPayslip(@Body() body: { employeeId: string; netPay: number; baseSalary: number }) {
    return createPayslipDraftCommand(body);
  }

  @Post('payslips/:id/finalize')
  @RequireModule('hr-base')
  @RequirePermission('hr.write')
  finalizePayslip(@Param('id') id: string, @Body() body: { approverRole?: string }) {
    return finalizePayslipCommand(id, body.approverRole);
  }
}
