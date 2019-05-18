import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SimpleUserInterface, UserInterface} from '../../model/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  url = '';

  constructor(private httpClient: HttpClient) { }

  login(data: {email: string, password: string}){
    return this.httpClient.post<UserInterface>(this.url + 'login', data);
  }

  register(data: UserInterface) {
    return this.httpClient.post<UserInterface>(this.url + 'register', data);
  }

  getSimpleUsers(){
    return this.httpClient.get<SimpleUserInterface>(this.url + 'simple-users');
  }

}
