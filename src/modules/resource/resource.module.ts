import { Module } from '@nestjs/common';
import { ResourceController } from './controllers/resource.controller';
import { ResourceService } from './services/resource.service';
import { ResourceDataSourceService } from './services/resource-data-source.service';
import { PasswordService } from '../../services/password.service';
import { SupportService } from '../../services/support.service';

@Module({
  controllers: [ResourceController],
  providers: [
    ResourceService,
    ResourceDataSourceService,
    PasswordService,
    SupportService
  ]
})
export class ResourceModule {}
