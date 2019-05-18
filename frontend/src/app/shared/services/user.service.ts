import {Injectable} from '@angular/core';
import {UserInterface} from '../model/interfaces/user.interface';
import {UserHttpService} from "./http/user-http.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserInterface;

  constructor(private userHttpService: UserHttpService, private router: Router) { }

  async login(data: {username: string, password: string}){
    return this.userHttpService.login(data).subscribe(
      (response) => {
      localStorage.setItem("jwt", response.token);
      return true;
    }, (error) => {
        console.log(error);
        return false;
      });
  }

  async logout(){
    localStorage.removeItem('jwt');
    this.router.navigate(['login']);
  }

  async register(data: UserInterface){
    this.user = data;
  console.log('Register: ');
  console.log(data);
    // TODO
  }

  getUser() {
    return this.userHttpService.getUser();
  }

}
