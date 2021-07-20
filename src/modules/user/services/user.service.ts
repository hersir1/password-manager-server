import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { User } from '../models/user';
import { Constants } from '../../../constants/constants';

@Injectable()
export class UserService {
	
	constructor() {
	}
	
	readUsers(): User[] {
		try {
			return JSON.parse(fs.readFileSync(`${Constants.DB_PATH}${path.sep}users${path.sep}users.json`, 'utf-8'));
		} catch (e) {
			throw new HttpException(
				JSON.stringify('Файла с пользователями не существует. Напишите в поддержку на jobjs@mail.ru'),
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
	
	writeUsers(users: User[]): void {
		try {
			fs.writeFileSync(`${Constants.DB_PATH}${path.sep}users${path.sep}users.json`, JSON.stringify(users), 'utf-8');
		} catch (e) {
			throw new HttpException(
				JSON.stringify('Файла с пользователями не существует. Напишите в поддержку на jobjs@mail.ru'),
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
	
	getCurrentId(): number {
		try {
			return JSON.parse(fs.readFileSync(`${Constants.DB_PATH}${path.sep}users${path.sep}id.json`, 'utf-8')).id;
		} catch (e) {
			throw new HttpException(
				JSON.stringify('Файла с id пользователей не существует. Напишите в поддержку на jobjs@mail.ru'),
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
	
	writeNextId(id: number): void {
		try {
			fs.writeFileSync(`${Constants.DB_PATH}${path.sep}users${path.sep}id.json`, JSON.stringify({ id }), 'utf-8');
		} catch (e) {
			throw new HttpException(
				JSON.stringify('Файла с id пользователей не существует. Напишите в поддержку на jobjs@mail.ru'),
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
}
