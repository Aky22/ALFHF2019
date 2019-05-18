import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {

  }

  onLogin(){
    this.router.navigate(['login']);
  }

  onLogout(){
    this.userService.logout();
  }

  onRegister(){
    this.router.navigate(['/register']);
  }
}
