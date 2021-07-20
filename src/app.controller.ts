import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';
import { Constants } from './constants/constants';

@Controller()
export class AppController implements OnModuleInit {
	
	constructor(
		private appService: AppService
	) {
	}
	
	onModuleInit(): any {
		const dbPathArr: string[] = process.cwd().split(path.sep);
		
		dbPathArr.splice(dbPathArr.length - 2, 2);
		dbPathArr.push(`db`);
		
		Constants.DB_PATH = dbPathArr.join(path.sep);
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
