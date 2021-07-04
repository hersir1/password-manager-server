import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { User } from '../models/user';

@Injectable()
export class UserService {

  readUsers(): User[] {
    try {
      return JSON.parse(fs.readFileSync(`${process.cwd()}/src/db/users/users.json`, 'utf-8'));
    } catch (e) {
      throw new HttpException(
        JSON.stringify('Файла с пользователями не существует. Напишите в поддержку на jobjs@mail.ru'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  writeUsers(users: User[]): void {
    try {
      fs.writeFileSync(`${process.cwd()}/src/db/users/users.json`, JSON.stringify(users), 'utf-8');
    } catch (e) {
      throw new HttpException(
        JSON.stringify('Файла с пользователями не существует. Напишите в поддержку на jobjs@mail.ru'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getCurrentId(): number {
    try {
      return JSON.parse(fs.readFileSync(`${process.cwd()}/src/db/users/id.json`, 'utf-8')).id;
    } catch (e) {
      throw new HttpException(
        JSON.stringify('Файла с id пользователей не существует. Напишите в поддержку на jobjs@mail.ru'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  writeNextId(id: number): void {
    try {
      fs.writeFileSync(`${process.cwd()}/src/db/users/id.json`, JSON.stringify({ id }), 'utf-8');
    } catch (e) {
      throw new HttpException(
        JSON.stringify('Файла с id пользователей не существует. Напишите в поддержку на jobjs@mail.ru'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
