import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {UserService} from "./user.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public userService: UserService, public router: Router) {}
   canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    let status;
    console.log(this.userService.getUser().subscribe((response) => {
      console.log(response);
      status =  true;
     }, (error) => {
      this.router.navigate(['login']);
      status =  false;
    }));

    return status.asObservable();

  }
}
