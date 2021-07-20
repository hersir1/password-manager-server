import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserDataSourceService } from './services/user-data-source.service';
import { PasswordService } from '../../services/password.service';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserDataSourceService,
    UserService,
    PasswordService
  ],
})
export class UserModule {
}
