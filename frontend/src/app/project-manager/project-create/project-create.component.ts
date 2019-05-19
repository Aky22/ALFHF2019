import { Component, OnInit } from '@angular/core';
import {ProjectInterface, SimpleProjectInterface} from '../../shared/model/interfaces/project.interface';
import {SimpleUserInterface, UserInterface} from '../../shared/model/interfaces/user.interface';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProjectHttpService} from '../../shared/services/http/project-http.service';
import {UsersHttpService} from '../../shared/services/http/users-http.service';
import {UsersService} from '../../shared/services/users.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  project: SimpleProjectInterface;
  users: SimpleUserInterface[] = [];
  selectedSimpleUsers: SimpleUserInterface[] = [];
  projectForm: FormGroup;

  constructor(private usersHttpService: UsersHttpService,
              private projectHttpService: ProjectHttpService,
              private usersService: UsersService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.usersHttpService.getUsers().subscribe(
      (response) => {
      for (const user of response._embedded.users) {
        this.users.push(this.usersService.userROtoSimpleUser(user));
      }
      console.log(this.users);
    }, (error) => {
      console.log(error);
    });
    this.selectedSimpleUsers = [];
    this.project = {
      name: '',
      description: '',
      deadline: new Date(),
    };
    this.projectForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'deadline': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.project.name = this.projectForm.value.name;
    this.project.description = this.projectForm.value.description;
    this.project.deadline = this.projectForm.value.deadline;
    this.projectHttpService.saveProject(this.project).subscribe(
      (response) => {
        console.log(response);
        this.projectForm.reset();
        this.router.navigate(['/project-manager/list']);
      }, (error) => {
        console.log(error);
      }
    );
  }

  onBack() {
    this.projectForm.reset();
    this.router.navigate(['/project-manager/list']);
  }

}
