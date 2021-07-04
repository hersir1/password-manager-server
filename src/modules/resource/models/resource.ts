import { Password } from '../../../model/password';

export class Resource {
  id: number;
  name: string;
  password: Password;
  userId: number;
  
  constructor() {
  }
}