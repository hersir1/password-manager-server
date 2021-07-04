import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Resource } from '../models/resource';
import { filter, orderBy, slice } from 'lodash';
import * as fs from 'fs';

@Injectable()
export class ResourceService {

  searchByField(resources: Resource[], name: string): Resource[] {
    return filter(resources, (resource) => {
      return resource.name.includes(name);
    });
  }

  sortArray(resources: Resource[], sortColumn: string, sortValue: 'asc' | 'desc'): Resource[] {
    return orderBy(resources, [sortColumn], [sortValue]);
  }

  getPortion(resources: Resource[], pageIndex: number, pageSize: number): Resource[] {
    let offset = (pageIndex - 1) * pageSize;

    return slice(slice(resources, offset), 0, pageSize);
  }

  readResources(): Resource[] {
    try {
      return JSON.parse(fs.readFileSync(`${process.cwd()}/src/db/resources/resources.json`, 'utf-8'));
    } catch (e) {
      throw new HttpException(
        JSON.stringify('Файла с ресурсами не существует. Напишите в поддержку на jobjs@mail.ru'),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  writeResources(resources: Resource[]): void {
    try {
      fs.writeFileSync(`${process.cwd()}/src/db/resources/resources.json`, JSON.stringify(resources), 'utf-8');
    } catch (e) {
      throw new HttpException(
        JSON.stringify('Файла с ресурсами не существует. Напишите в поддержку на jobjs@mail.ru'),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  getNextId(): number {
    try {
      return JSON.parse(fs.readFileSync(`${process.cwd()}/src/db/resources/id.json`, 'utf-8')).id;
    } catch (e) {
      throw new HttpException(
        JSON.stringify('Файла с id ресурсов не существует. Напишите в поддержку на jobjs@mail.ru'),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  writeNextId(id: number): void {
    try {
      fs.writeFileSync(`${process.cwd()}/src/db/resources/id.json`, JSON.stringify({id}), 'utf-8');
    } catch (e) {
      throw new HttpException(
        JSON.stringify('Файла с id ресурсов не существует. Напишите в поддержку на jobjs@mail.ru'),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
