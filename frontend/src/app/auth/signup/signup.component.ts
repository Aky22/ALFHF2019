import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserInterface} from '../../shared/model/interfaces/user.interface';
import {Role} from '../../shared/model/enums/role.enum';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  user: UserInterface;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.user = {
      email: '',
      role: Role.Basic,
      username: '',
      password: ''
    };
  }

  onSignup() {
    this.user.email = this.signupForm.value.email;
    this.user.username = this.signupForm.value.username;
    this.user.password = this.signupForm.value.password;
    this.userService.register(this.user);
  }

}
