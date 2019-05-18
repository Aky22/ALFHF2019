import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from './user.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public userService: UserService, public router: Router) {
/*
    this.userService.refreshUser();
*/
  }

   canActivate(): boolean {
    if(!this.userService.getUser()){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
