import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { timer } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
	
	constructor(private appService: AppService) {
	}

	onModuleInit(): any {
		setTimeout(() => {
			this.shutdown();
		}, 4000);
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
