import { Injectable } from '@nestjs/common';
import { User } from '../models/user';
import { UserService } from './user.service';
import { PasswordService } from '../../../services/password.service';
import { UserDto } from '../models/user-dto';
import { UserDtoFront } from '../models/user-dto-front';

@Injectable()
export class UserDataSourceService {

  constructor(
    private userService: UserService,
    private passwordService: PasswordService
  ) {
  }

  async getUserById(id: number): Promise<UserDto> {
    let users: User[] = this.userService.readUsers();

    const user = users.find(elem => elem.id === id);

    return {
      id: user.id,
      login: user.login,
      email: user.email,
      password: this.passwordService.decrypt(user.password)
    };
  }

  async getUserByLogin(loginOrEmail: string, password: string): Promise<UserDtoFront | null> {
    let users: User[] = this.userService.readUsers();

    const user: User = users.find(elem => elem.login === loginOrEmail || elem.email === loginOrEmail);

    if (!user) {
      return null;
    }

    if (password !== this.passwordService.decrypt(user.password)) {
      return null;
    }

    return {
      id: user.id,
      login: user.login,
      email: user.email
    };
  }

  async addUser(userDto: UserDto): Promise<string | null> {
    let users: User[] = this.userService.readUsers();

    if (users.find(elem => elem.email === userDto.email)) {
      return null;
    }
    if (users.find(elem => elem.login === userDto.login)) {
      return null;
    }

    let id: number = this.userService.getCurrentId();

    users.push({
      id,
      login: userDto.login,
      email: userDto.email,
      password: this.passwordService.encrypt(userDto.password)
    });

    this.userService.writeUsers(users);

    id += 1;
    this.userService.writeNextId(id);

    return JSON.stringify('Пользователь успешно добавлен');
  }

  async updateUser(userDto: UserDto): Promise<string> {
    let users: User[] = this.userService.readUsers();

    if (users.find(elem => elem.email === userDto.email)) {
      return null;
    }
    if (users.find(elem => elem.login === userDto.login)) {
      return null;
    }

    users = users.filter(elem => elem.id === userDto.id);

    users.push({
      id: userDto.id,
      login: userDto.login,
      email: userDto.email,
      password: this.passwordService.encrypt(userDto.password)
    });

    this.userService.writeUsers(users);

    return JSON.stringify('Информация успешно обновлена');
  }

  async deleteUser(id: number): Promise<string> {
    let users: User[] = this.userService.readUsers();

    users = users.filter(elem => elem.id !== id);

    this.userService.writeUsers(users);

    return JSON.stringify('Пользователь успешно удалён');
  }
}
