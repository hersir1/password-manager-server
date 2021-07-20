import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';
import { SupportService } from './services/support.service';

/*TODO
*  1) Путь не прописывается
*   2) Сервер не вырубается
* */

@Controller()
export class AppController implements OnModuleInit {
  
  constructor(
    private appService: AppService,
    private supportService: SupportService
  ) {
  }
  
  onModuleInit(): any {
    const dbPathArr: string[] = process.cwd().split(path.sep);
    
    dbPathArr.splice(dbPathArr.length - 2, 2);
    dbPathArr.push('db');
    
    const dbPath: string = dbPathArr.join(path.sep);
    
    this.supportService.dbPath = dbPath;
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
