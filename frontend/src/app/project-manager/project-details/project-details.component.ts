import {Component, Input, OnInit} from '@angular/core';
import {ProjectInterface} from '../../shared/model/interfaces/project.interface';
import {SimpleUserInterface, UserInterface} from '../../shared/model/interfaces/user.interface';
import {TaskInterface} from '../../shared/model/interfaces/task.interface';
import {ProjectService} from '../../shared/services/project.service';
import {UsersService} from '../../shared/services/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectHttpService} from '../../shared/services/http/project-http.service';
import {UsersHttpService} from '../../shared/services/http/users-http.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  mode: string;
  projectId: number;
  users: UserInterface[] = [];
  project: ProjectInterface;
  contributors: UserInterface[] = [];
  tasks: TaskInterface[] = [];
  selectedTask: TaskInterface;
  display = {details: false, edit: false, new: false};

  constructor(private projectHttpService: ProjectHttpService,
              private usersHttpService: UsersHttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectId = +this.route.snapshot.paramMap.get('id');
    this.mode = this.route.snapshot.paramMap.get('mode');
    console.log(this.tasks);


    this.projectHttpService.getProjectById(this.projectId).subscribe(
      (response) => {
        this.project = response;
      }, (error) => {
        console.log(error);
      }
    );

    this.usersHttpService.getUsers().subscribe(
      (response) => {
        this.users = response;
      }, (error) => {
        console.log(error);
      }
    );



  }

  onBack(){
    this.router.navigate(['/project-manager/list']);
  }

  onSave(){
    this.projectHttpService.saveProject(this.project).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/project-manager/list']);

      }
    );
  }


  onTaskDetails(task: TaskInterface){
    this.selectedTask = task;
    this.display = {details: true, edit: false, new: false};
    console.log('Details');
    console.log(task);
  }

  onTaskEdit(task: TaskInterface){
    this.selectedTask = task;
    this.display = {details: false, edit: true, new: false};

    console.log('Edit');
    console.log(task);
  }

  onNewTask(){
    this.display = {details: false, edit: false, new: true};
  }

  onTaskCancel(){
    this.display = {details: false, edit: false, new: false};
  }

  onTaskSave(task: TaskInterface){
    this.display = {details: false, edit: false, new: false};
  }

  onTaskDelete(task: TaskInterface){
    console.log('Delete');
    console.log(task);
  }

  isEditable(){
    return this.mode === 'edit';
  }
}

