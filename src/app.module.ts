import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ResourceModule } from './modules/resource/resource.module';

@Module({
	imports: [UserModule, ResourceModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {
}
