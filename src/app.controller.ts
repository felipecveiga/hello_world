import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/Bsm')
  getBsm(): string {
    return this.appService.getBsm();
  }
  @Get('/Objetivo')
  getObjetivo(): string {
    return this.appService.getObjetivo();
  }
}
