import { Component, OnInit } from '@angular/core';
import {ProjectInterface} from '../../shared/model/interfaces/project.interface';
import {SimpleUserInterface, UserInterface} from '../../shared/model/interfaces/user.interface';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProjectHttpService} from '../../shared/services/http/project-http.service';
import {UsersHttpService} from '../../shared/services/http/users-http.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  project: ProjectInterface;
  users: UserInterface[] = [];
  selectedSimpleUsers: SimpleUserInterface[] = [];
  projectForm: FormGroup;

  constructor(private usersHttpService: UsersHttpService,
              private projectHttpService: ProjectHttpService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.usersHttpService.getUsers().subscribe((response) => {
      this.users = response;
    }, (error) => {
      console.log(error);
    });
    this.selectedSimpleUsers = [];
    this.project = {
      name: '',
      description: '',
      deadline: new Date(),
      contributors: []
    };
    this.projectForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'deadline': new FormControl('', Validators.required),
      'contributorIds': new FormControl('')
    });
  }

  onSubmit(){
    this.project.name = this.projectForm.value.name;
    this.project.description = this.projectForm.value.description;
    this.project.deadline = this.projectForm.value.deadline;
    this.project.contributors = this.projectForm.value.contributorIds;
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

  onBack(){
    this.projectForm.reset();
    this.router.navigate(['/project-manager/list']);
  }

}
