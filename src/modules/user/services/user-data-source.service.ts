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
      lastLogin: user.lastLogin,
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

    this.updateLastLogin(user.id);

    return {
      id: user.id,
      login: user.login,
      email: user.email,
      lastLogin: user.lastLogin
    };
  }

  async addUser(userDto: UserDto): Promise<UserDtoFront | null> {
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
      lastLogin: new Date(),
      password: this.passwordService.encrypt(userDto.password)
    });

    this.userService.writeUsers(users);

    const nextId = id + 1;
    this.userService.writeNextId(nextId);

    return {
      id,
      login: userDto.login,
      email: userDto.email,
      lastLogin: userDto.lastLogin
    };
  }

  async updateUser(userDto: UserDto): Promise<UserDtoFront | null> {
    let users: User[] = this.userService.readUsers();

    const updatedUser = users.find(elem => elem.id === userDto.id);

    if (users.find(elem => elem.email === userDto.email) && updatedUser.email !== userDto.email) {
      return null;
    }
    
    if (users.find(elem => elem.login === userDto.login) && updatedUser.login !== userDto.login) {
      return null;
    }

    users = users.filter(elem => elem.id !== userDto.id);

    users.push({
      id: userDto.id,
      login: userDto.login,
      email: userDto.email,
      lastLogin: updatedUser.lastLogin,
      password: this.passwordService.encrypt(userDto.password)
    });

    this.userService.writeUsers(users);

    return {
      id: userDto.id,
      login: userDto.login,
      email: userDto.email,
      lastLogin: updatedUser.lastLogin
    };
  }

  async deleteUser(id: number): Promise<void> {
    let users: User[] = this.userService.readUsers();

    users = users.filter(elem => elem.id !== id);

    this.userService.writeUsers(users);
  }

  private updateLastLogin(userId: number): void {
    let users: User[] = this.userService.readUsers();

    const loginUser = users.find(elem => elem.id === userId);

    users = users.filter(elem => elem.id !== userId);

    users.push({
      id: loginUser.id,
      login: loginUser.login,
      email: loginUser.email,
      lastLogin: new Date(),
      password: loginUser.password
    });

    this.userService.writeUsers(users);
  }
}
