import {Role} from '../enums/role.enum';

export interface UserInterface {
  id?: number;
  username: string;
  email: string;
  role: Role;
  password?: string;
}

export interface SimpleUserInterface {
  id?: number;
  username: string;
  email: string;
}

export interface LoginInterface {
  token: string
}
