import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private appService: AppService) {
  }

  @Get('/ping')
  ping(): boolean {
    return true;
  }

  @Get('/shutdown')
  shutdown(): void {
    this.appService.shutdown();
  }

}
