import {EventEmitter, Injectable} from '@angular/core';
import {UserInterface} from '../model/interfaces/user.interface';
import {UserHttpService} from './http/user-http.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserInterface;
  userChange = new EventEmitter<UserInterface>();

  constructor(private userHttpService: UserHttpService, private router: Router) {
    if (localStorage.getItem('jwt')){
      this.user = this.getUser();
    }
  }

  async login(data: {username: string, password: string}) {
    this.userHttpService.login(data).subscribe(
      (response) => {
      localStorage.setItem('jwt', response.token);
      this.userHttpService.getUser().subscribe(
        (user) => {
          this.user = {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role
          };
          this.userChange.emit(this.user);
          this.router.navigate(['project-manager/list']);
        }, (error) => {
        }
      );
    }, (error) => {
      });
  }

  logout() {
    localStorage.removeItem('jwt');
    this.user = undefined;
    this.userChange.emit(this.user);
    this.router.navigate(['login']);
  }

  async register(data: UserInterface) {
    this.userHttpService.register(data).subscribe(
      (response) => {
        this.user = response;
        this.userChange.emit(this.user);
        this.router.navigate(['project-manager/list']);
      }, (error) => {
      }
    );
  }

  getUser() {
    if (this.user === undefined) {
      this.userHttpService.getUser().pipe(map( (response) => {
        this.user = {
          id: response.id,
          email: response.email,
          username: response.username,
          role: response.role
        };
        this.userChange.emit(this.user);
        return this.user;
      }, (error) => {
        this.logout();
      }));
    } else {
      return this.user;
    }
  }

  getUserHttp(){
    return this.userHttpService.getUser();
  }
}
