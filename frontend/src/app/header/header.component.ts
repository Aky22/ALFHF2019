import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {Router} from '@angular/router';
import {UserInterface} from '../shared/model/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: UserInterface;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userService.userChange.subscribe(
      (user) => {
        this.user = user;
    });
    this.user = this.userService.getUser();
  }

  onLogin(){
    this.userService.logout();
    this.router.navigate(['login']);
  }

  onLogout(){
    this.userService.logout();
  }

  onRegister(){
    this.userService.logout();
    this.router.navigate(['/register']);
  }
}
