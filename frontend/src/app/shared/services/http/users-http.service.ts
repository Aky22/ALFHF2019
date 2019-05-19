import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserROInterface, UsersROInterface} from '../../model/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersHttpService {
  url = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  getUsers(){
    return this.httpClient.get<UsersROInterface>(this.url + 'users');
  }

  getUsersByHref(href: string){
    return this.httpClient.get<UsersROInterface>(href);
  }

  getUser(href: string){
    return this.httpClient.get<UserROInterface>(href);
  }

  getUserById(id: number){
    return this.httpClient.get<UserROInterface>('http://localhost:8080/users/' + id);
  }

}
