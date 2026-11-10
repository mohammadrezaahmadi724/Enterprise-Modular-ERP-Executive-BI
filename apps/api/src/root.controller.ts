import { Controller, Get, Redirect } from '@nestjs/common';
import { Public } from './decorators/access.decorator';

@Public()
@Controller()
export class RootController {
  @Get()
  @Redirect('/health', 302)
  root() {
    return;
  }

  @Get('api')
  apiIndex() {
    return {
      name: 'ERP Platform API',
      health: '/health',
      metrics: '/metrics',
      docs: 'POST /api/v1/auth/login',
    };
  }
}
