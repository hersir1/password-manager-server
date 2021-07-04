import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Resource } from '../models/resource';
import { ResourceDto } from '../models/resource-dto';
import { ResourceDataSourceService } from '../services/resource-data-source.service';

@Controller('resource')
export class ResourceController {

  constructor(private resourceServiceDataSource: ResourceDataSourceService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getResources(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('pageIndex', ParseIntPipe) pageIndex: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('name') name?: string,
    @Query('sortColumn') sortColumn?: string,
    @Query('sortValue') sortValue?: 'asc' | 'desc' | null
  ): Promise<Resource[]> {
    return this.resourceServiceDataSource.getResources(userId, pageIndex, pageSize, sortColumn, sortValue, name);
  }

  @Get('/size')
  @HttpCode(HttpStatus.OK)
  getResourcesSize(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('name') name?: string
  ): Promise<number> {
    return this.resourceServiceDataSource.getResourcesSize(userId, name);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getResourceById(@Param('id', ParseIntPipe) id: number): Promise<ResourceDto> {
    return this.resourceServiceDataSource.getResourceById(id);
  }

  @Get('password/:id')
  @HttpCode(HttpStatus.OK)
  showResourcePassword(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.resourceServiceDataSource.showResourcePassword(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createResource(@Body() resourceDto: ResourceDto): Promise<string> {
    return this.resourceServiceDataSource.addResource(resourceDto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  updateResource(@Body() resourceDto: ResourceDto): Promise<string> {
    return this.resourceServiceDataSource.updateResource(resourceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteResource(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.resourceServiceDataSource.deleteResource(id);
  }
}
