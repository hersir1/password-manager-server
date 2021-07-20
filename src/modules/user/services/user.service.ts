import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { User } from '../models/user';
import { SupportService } from '../../../services/support.service';

@Injectable()
export class UserService {

  constructor(
    private supportService: SupportService
  ) {
  }
  
  readUsers(): User[] {
    try {
      console.log(`${this.supportService.dbPath}/users/users.json`);
      return JSON.parse(fs.readFileSync(`${this.supportService.dbPath}/users/users.json`, 'utf-8'));
    } catch (e) {
      throw new HttpException(
        JSON.stringify('Файла с пользователями не существует. Напишите в поддержку на jobjs@mail.ru'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  writeUsers(users: User[]): void {
    try {
      fs.writeFileSync(`${this.supportService.dbPath}/users/users.json`, JSON.stringify(users), 'utf-8');
    } catch (e) {
      throw new HttpException(
        JSON.stringify('Файла с пользователями не существует. Напишите в поддержку на jobjs@mail.ru'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getCurrentId(): number {
    try {
      return JSON.parse(fs.readFileSync(`${this.supportService.dbPath}/users/id.json`, 'utf-8')).id;
    } catch (e) {
      throw new HttpException(
        JSON.stringify('Файла с id пользователей не существует. Напишите в поддержку на jobjs@mail.ru'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  writeNextId(id: number): void {
    try {
      fs.writeFileSync(`${this.supportService.dbPath}/users/id.json`, JSON.stringify({ id }), 'utf-8');
    } catch (e) {
      throw new HttpException(
        JSON.stringify('Файла с id пользователей не существует. Напишите в поддержку на jobjs@mail.ru'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
