import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginInterface, UserInterface, UserMeROInterface, UserROInterface} from '../../model/interfaces/user.interface';

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
    return this.httpClient.post<UserROInterface>(this.url + 'auth/signup', {username: data.username, password: data.password, email: data.email});
  }

  getUser() {
    return this.httpClient.get<UserMeROInterface>(this.url + 'users/me');
  }

}
