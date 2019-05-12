import { Component, OnInit } from '@angular/core';
import {ProjectInterface} from '../../shared/model/interfaces/project.interface';
import {UsersService} from '../../shared/services/users.service';
import {SimpleUserInterface} from '../../shared/model/interfaces/user.interface';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../shared/services/project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  project: ProjectInterface;
  simpleUsers: SimpleUserInterface[];
  selectedSimpleUsers: SimpleUserInterface[];
  projectForm: FormGroup;

  constructor(private usersService: UsersService,
              private fb: FormBuilder,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.simpleUsers = [];
    this.selectedSimpleUsers = [];
    this.project = {
      name: '',
      description: '',
      deadline: new Date(),
      contributorIds: []
    };
    this.simpleUsers = this.usersService.getSimpleUsers();
    this.projectForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'deadline': new FormControl('', Validators.required),
      'contributorIds': new FormControl('', Validators.required)
    });
  }

  onSubmit(){
    this.project.name = this.projectForm.value.name;
    this.project.description = this.projectForm.value.description;
    this.project.deadline = this.projectForm.value.deadline;
    this.project.contributorIds = this.projectForm.value.contributorIds;
    this.projectService.saveProject(this.project);
    console.log(this.projectForm);
  }

}
