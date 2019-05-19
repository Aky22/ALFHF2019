import {Role} from '../enums/role.enum';

export interface UserInterface {
  id?: number;
  username: string;
  email: string;
  role?: Role;
  password?: string;
  projects?: {href: string};
  self?: {href: string};
}

export interface SimpleUserInterface {
  id?: number;
  username: string;
  email: string;
  role: Role;
}

export interface LoginInterface {
  token: string;
}

export interface UsersROInterface {
  _embedded: {
    users: UserROInterface[]
  };
}

export interface UserROInterface {
  id: number;
  username: string;
  email: string;
  role: Role;
  _links: {
    projects: {href: string};
    self: {href: string};
  };
}


