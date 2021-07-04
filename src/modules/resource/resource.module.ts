import { Module } from '@nestjs/common';
import { ResourceController } from './controllers/resource.controller';
import { ResourceService } from './services/resource.service';
import { ResourceDataSourceService } from './services/resource-data-source.service';
import { PasswordService } from '../../services/password.service';

@Module({
  controllers: [ResourceController],
  providers: [ResourceService, ResourceDataSourceService, PasswordService]
})
export class ResourceModule {}
