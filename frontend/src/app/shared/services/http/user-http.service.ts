import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginInterface, SimpleUserInterface, UserInterface} from '../../model/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  url = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  login(data: {username: string, password: string}){
    return this.httpClient.post<LoginInterface>(this.url + 'auth/login', data);
  }

  register(data: UserInterface) {
    return this.httpClient.post<UserInterface>(this.url + 'auth/signup', data);
  }

  getSimpleUsers(){
    return this.httpClient.get<SimpleUserInterface>(this.url + 'simple-users');
  }

  getUser() {
    return this.httpClient.get<UserInterface>(this.url + 'users/me')
  }

}
