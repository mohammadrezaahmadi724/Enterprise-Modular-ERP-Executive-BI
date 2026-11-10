import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { Public } from '../../decorators/access.decorator';
import { randomUUID } from 'node:crypto';
import type { ErpModuleCode } from '@repo/contracts';
import {
  computeModuleEstimate,
  listPlansWithModules,
  loadModuleCatalog,
} from '../platform/pricing-catalog.service';
import { platformDb } from '../../prisma/platform-db';

type EstimateBody = { moduleCodes: ErpModuleCode[] };

type MeetingBody = {
  hasEstimate: boolean;
  estimateId?: string;
  moduleCodes?: ErpModuleCode[];
  meetingType: 'phone' | 'online' | 'in_person_tehran';
  jalaliDate: string;
  timeSlot: string;
  fullName: string;
  phone: string;
  jobTitle: string;
  company: string;
  subject?: string;
  note?: string;
};

@Public()
@Controller('api/v1/public/pricing')
export class PublicPricingController {
  @Get('catalog')
  async catalog() {
    const { modules, catalogVersion } = await loadModuleCatalog();
    const plans = await listPlansWithModules();
    return { catalogVersion, modules, plans };
  }

  @Post('estimate')
  estimate(@Body() body: EstimateBody, @Headers('idempotency-key') idempotencyKey?: string) {
    const codes = Array.isArray(body.moduleCodes) ? body.moduleCodes : [];
    const correlationId = idempotencyKey ?? randomUUID();
    return computeModuleEstimate(codes).then((result) => ({
      ...result,
      estimateId: correlationId,
    }));
  }

  @Get('estimate/preview')
  async preview(@Query('modules') modulesParam?: string) {
    const codes = (modulesParam ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean) as ErpModuleCode[];
    return computeModuleEstimate(codes);
  }

  @Post('meeting-requests')
  async meeting(@Body() body: MeetingBody, @Headers('idempotency-key') idempotencyKey?: string) {
    const correlationId = idempotencyKey ?? randomUUID();
    const typeLabel =
      body.meetingType === 'phone'
        ? 'تلفنی'
        : body.meetingType === 'online'
          ? 'آنلاین'
          : 'حضوری (تهران)';
    const subject = body.subject?.trim() || 'رزرو جلسه مشاوره ERP';
    const detail = [
      `نوع: ${typeLabel}`,
      `تاریخ: ${body.jalaliDate}`,
      `ساعت: ${body.timeSlot}`,
      `برآورد دارد: ${body.hasEstimate ? 'بله' : 'خیر'}`,
      body.moduleCodes?.length ? `ماژول‌ها: ${body.moduleCodes.join(', ')}` : '',
      body.note?.trim() ? `توضیح: ${body.note.trim()}` : '',
      `correlation: ${correlationId}`,
    ]
      .filter(Boolean)
      .join('\n');

    await platformDb.supportTicket.create({
      data: {
        tenantId: null,
        subject: `${subject} — ${body.fullName} (${body.company})`,
        priority: 'high',
        status: 'open',
        category: 'meeting_request',
        metadata: {
          type: 'erp_meeting_request',
          correlationId,
          hasEstimate: body.hasEstimate,
          estimateId: body.estimateId ?? null,
          moduleCodes: body.moduleCodes ?? [],
          meetingType: body.meetingType,
          jalaliDate: body.jalaliDate,
          timeSlot: body.timeSlot,
          contact: {
            fullName: body.fullName,
            phone: body.phone,
            jobTitle: body.jobTitle,
            company: body.company,
            subject: body.subject ?? null,
            note: body.note ?? null,
          },
          detail,
        },
      },
    });

    return {
      accepted: true,
      correlationId,
      message: 'درخواست ثبت شد',
      contactEcho: {
        fullName: body.fullName,
        phone: body.phone,
        jobTitle: body.jobTitle,
        company: body.company,
        detail,
      },
    };
  }
}
