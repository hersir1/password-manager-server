import { Injectable } from '@nestjs/common';
import { ResourceDto } from './model/resource-dto';
import * as fs from 'fs';
import { SupportService } from './services/support.service';
import { PasswordService } from './services/password.service';
import { Resource } from './model/resource';

@Injectable()
export class AppService {
  
  constructor(
    private supportService: SupportService,
    private passwordService: PasswordService,
  ) {
  }
  
  async getResources(
    pageIndex: number,
    pageSize: number,
    sortColumn?: string,
    sortValue?: 'asc' | 'desc' | null,
    name?: string,
  ): Promise<Resource[]> {
    let resources: Resource[] = this.readDB();
    
    if (name) {
      resources = this.supportService.searchByField(resources, name);
    }
    if (sortValue && sortColumn) {
      resources = this.supportService.sortArray(resources, sortColumn, sortValue);
    }
    resources = this.supportService.getPortion(resources, pageIndex, pageSize);
    return resources;
  }
  
  async getResourcesSize(
    name: string,
  ): Promise<number> {
    let resources: Resource[] = this.readDB();
    
    if (name) {
      resources = this.supportService.searchByField(resources, name);
    }
    return resources.length;
  }
  
  async getResourceById(id: number): Promise<ResourceDto> {
    let resourcesArr: Resource[] = this.readDB();
    
    const resource = resourcesArr.find(elem => elem.id === id);
    
    return {
      id: resource.id,
      password: this.passwordService.decrypt(resource.password),
      name: resource.name
    };
  }
  
  async createResource(resourceDto: ResourceDto): Promise<string> {
    let resources: Resource[] = this.readDB();
    
    let id = this.getNextId();
    
    resources.push({
      id,
      password: this.passwordService.encrypt(resourceDto.password),
      name: resourceDto.name
    });
    
    id += 1;
    
    this.writeNextId(id);
    this.writeDB(resources);
    
    return JSON.stringify('Информация успешно добавлена');
  }
  
  async updateResource(resourceDto: ResourceDto): Promise<string> {
    let resources: Resource[] = this.readDB();
    
    resources = resources.filter(elem => elem.id !== resourceDto.id);
    
    resources.push({
      id: resourceDto.id,
      password: this.passwordService.encrypt(resourceDto.password),
      name: resourceDto.name
    });
    
    this.writeDB(resources);
    
    return JSON.stringify('Информация успешно обновлена');
  }
  
  async deleteResource(id: number): Promise<string> {
    let resources: Resource[] = this.readDB();
    
    resources = resources.filter(elem => elem.id !== id);
    
    this.writeDB(resources);
    
    return JSON.stringify('Информация успешно удалена');
  }
  
  async showResourcePassword(id: number): Promise<string> {
    let resourcesArr: Resource[] = this.readDB();
  
    const resource = resourcesArr.find(elem => elem.id === id);
    
    return JSON.stringify(this.passwordService.decrypt(resource.password));
  }
  
  private readDB(): Resource[] {
    try {
      return JSON.parse(fs.readFileSync(`${process.cwd()}/src/db/db.json`, 'utf-8'));
    } catch (e) {
      throw e;
    }
  }
  
  private writeDB(resources: Resource[]): void {
    try {
      fs.writeFileSync(`${process.cwd()}/src/db/db.json`, JSON.stringify(resources), 'utf-8');
    } catch (e) {
      throw e;
    }
  }
  
  private getNextId(): number {
    try {
      return JSON.parse(fs.readFileSync(`${process.cwd()}/src/db/id.json`, 'utf-8')).id;
    } catch (e) {
      throw e;
    }
  }
  
  private writeNextId(id: number): void {
    try {
      fs.writeFileSync(`${process.cwd()}/src/db/id.json`, JSON.stringify({id}), 'utf-8');
    } catch (e) {
      throw e;
    }
  }
  
}
