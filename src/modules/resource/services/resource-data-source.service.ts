import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PasswordService } from '../../../services/password.service';
import { Resource } from '../models/resource';
import { ResourceDto } from '../models/resource-dto';
import { ResourceService } from './resource.service';

@Injectable()
export class ResourceDataSourceService {

  constructor(
    private resourceService: ResourceService,
    private passwordService: PasswordService
  ) {
  }

  async getResources(
    userId: number,
    pageIndex: number,
    pageSize: number,
    sortColumn?: string,
    sortValue?: 'asc' | 'desc' | null,
    name?: string
  ): Promise<Resource[]> {
    let resources: Resource[] = this.resourceService.readResources();

    resources = resources.filter(elem => elem.userId === userId);

    if (name) {
      resources = this.resourceService.searchByField(resources, name);
    }
    if (sortValue && sortColumn) {
      resources = this.resourceService.sortArray(resources, sortColumn, sortValue);
    }

    resources = this.resourceService.getPortion(resources, pageIndex, pageSize);

    return resources;
  }

  async getResourcesSize(
    userId: number,
    name: string
  ): Promise<number> {
    let resources: Resource[] = this.resourceService.readResources();

    resources = resources.filter(elem => elem.userId === userId);

    if (name) {
      resources = this.resourceService.searchByField(resources, name);
    }

    return resources.length;
  }

  async getResourceById(id: number): Promise<ResourceDto> {
    let resourcesArr: Resource[] = this.resourceService.readResources();

    const resource = resourcesArr.find(elem => elem.id === id);

    return {
      id: resource.id,
      password: this.passwordService.decrypt(resource.password),
      name: resource.name,
      userId: resource.userId
    };
  }

  async addResource(resourceDto: ResourceDto): Promise<boolean | null> {
    let resources: Resource[] = this.resourceService.readResources();

    if (resources.find(elem => elem.name === resourceDto.name && elem.userId === resourceDto.userId)) {
      return null;
    }

    let id = this.resourceService.getNextId();

    resources.push({
      id,
      password: this.passwordService.encrypt(resourceDto.password),
      name: resourceDto.name,
      userId: resourceDto.userId
    });

    this.resourceService.writeResources(resources);

    const nextId = id + 1;
    this.resourceService.writeNextId(nextId);

    return true;
  }

  async updateResource(resourceDto: ResourceDto): Promise<boolean | null> {
    let resources: Resource[] = this.resourceService.readResources();

    resources = resources.filter(elem => elem.id !== resourceDto.id);

    resources.push({
      id: resourceDto.id,
      password: this.passwordService.encrypt(resourceDto.password),
      name: resourceDto.name,
      userId: resourceDto.userId
    });

    this.resourceService.writeResources(resources);

    return true;
  }

  async deleteResource(id: number): Promise<boolean> {
    let resources: Resource[] = this.resourceService.readResources();

    resources = resources.filter(elem => elem.id !== id);

    this.resourceService.writeResources(resources);

    return true;
  }

  async showResourcePassword(id: number): Promise<string> {
    let resourcesArr: Resource[] = this.resourceService.readResources();

    const resource = resourcesArr.find(elem => elem.id === id);

    return JSON.stringify(this.passwordService.decrypt(resource.password));
  }
  
  async deleteAllUserResources(userId: number): Promise<boolean> {
    let resourcesArr: Resource[] = this.resourceService.readResources();
    
    resourcesArr = resourcesArr.filter(elem => elem.userId !== userId);
    
    this.resourceService.writeResources(resourcesArr);
    
    return true;
  }
}
