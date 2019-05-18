import {Injectable} from '@angular/core';
import {UserInterface} from '../model/interfaces/user.interface';
import {Role} from '../model/enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserInterface;

  constructor() { }

  async login(data: {email: string, password: string}){
    console.log('Login: ');
    this.user = {
      id: 1,
      email: data.email,
      username: 'Dugesz',
      role: Role.Admin,
    };
    console.log(this.user);
    // TODO
  }

  async logout(){
    console.log('Logout: ');
    console.log(this.user);
    // TODO
  }

  async register(data: UserInterface){
    this.user = data;
  console.log('Register: ');
  console.log(data);
    // TODO
  }

  isLoggedIn(){
    return this.user === undefined;
    // TODO
  }
}
