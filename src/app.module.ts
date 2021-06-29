import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SupportService } from "./services/support.service";
import { PasswordService } from './services/password.service';

@Module({
	imports: [],
	controllers: [AppController],
	providers: [AppService, SupportService, PasswordService]
})
export class AppModule {
}
