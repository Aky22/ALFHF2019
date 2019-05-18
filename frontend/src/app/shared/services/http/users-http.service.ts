import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProjectInterface} from '../../model/interfaces/project.interface';
import {UserInterface} from '../../model/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersHttpService {
  url = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  getUsers(){
    return this.httpClient.get<UserInterface[]>(this.url + 'users');
  }
}
