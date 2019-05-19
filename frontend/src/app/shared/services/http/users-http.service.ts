import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsersROInterface} from '../../model/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersHttpService {
  url = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  getUsers(){
    return this.httpClient.get<UsersROInterface>(this.url + 'users');
  }
}
