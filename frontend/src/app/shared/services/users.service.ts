import {Injectable} from '@angular/core';
import {SimpleUserInterface, UserInterface} from '../model/interfaces/user.interface';
import {Role} from '../model/enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: UserInterface[] = [];
  constructor() {
    this.users = [
      {id: 1, email: 'user1@test', username: 'user1', role: Role.Basic, password: 'asd123'},
      {id: 2, email: 'user2@test', username: 'user2', role: Role.Basic, password: 'asd123'},
      {id: 3, email: 'user3@test', username: 'user3', role: Role.Basic, password: 'asd123'},
    ];
  }

  getSimpleUsers(){
    const simpleUsers: SimpleUserInterface[] = [];
    for (const user of this.users){
      simpleUsers.push({id: user.id, email: user.email, username: user.username});
    }
    return simpleUsers;
  }

  getSimpleUserById(id: number){
    for (const user of this.users){
      if (user.id === id) {
        return {id: user.id, email: user.email, username: user.username};
      }
    }
    return null;
  }
}
