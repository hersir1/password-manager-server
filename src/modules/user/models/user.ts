import { Password } from '../../../model/password';

export class User {
  id: number;
  login: string;
  email: string;
  password: Password;
  lastLogin: Date;

  constructor() {
  }
}