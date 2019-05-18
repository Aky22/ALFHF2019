import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('f') signinForm: NgForm;
  user: {email: string, password: string};

  constructor() { }

  ngOnInit() {
    this.user = {email: '', password: ''};
  }

  onSignin(){
    this.user.email = this.signinForm.value.email;
    this.user.password = this.signinForm.value.password;
    // TODO call login
  }

}
