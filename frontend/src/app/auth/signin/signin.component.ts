import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('f') signinForm: NgForm;
  user: {username: string, password: string};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user = {username: '', password: ''};
  }

  async onSignin(){
    this.user.username = this.signinForm.value.username;
    this.user.password = this.signinForm.value.password;
    this.userService.login(this.user);

  }

}
