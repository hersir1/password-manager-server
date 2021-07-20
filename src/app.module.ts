import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ResourceModule } from './modules/resource/resource.module';
import { SupportService } from './services/support.service';

@Module({
	imports: [UserModule, ResourceModule],
	controllers: [AppController],
	providers: [AppService, SupportService]
})
export class AppModule {
}
