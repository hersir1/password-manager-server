export class UserDto {
  id: number;
  login: string;
  email: string;
  password: string;
  lastLogin?: Date;

  constructor() {
  }
}