import { Controller, Get } from '@nestjs/common';
import { AdminPanelService } from './admin-panel.service';

@Controller()
export class AdminPanelController {
  constructor(private readonly adminPanelService: AdminPanelService) {}

  @Get()
  getHello(): string {
    return this.adminPanelService.getHello();
  }
}
