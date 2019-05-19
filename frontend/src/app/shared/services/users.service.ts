import {Injectable} from '@angular/core';
import {SimpleUserInterface, UserInterface, UserROInterface} from '../model/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: UserInterface[] = [];
  constructor() { }


  userROtoSimpleUser(ro: UserROInterface): SimpleUserInterface{
    return {
      id: ro.id,
      username: ro.username,
      email: ro.email,
      role: ro.role
    };
  }
}
