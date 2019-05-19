import {Component, OnInit} from '@angular/core';
import {ProjectInterface} from '../../shared/model/interfaces/project.interface';
import {SimpleUserInterface, UserInterface} from '../../shared/model/interfaces/user.interface';
import {TaskInterface} from '../../shared/model/interfaces/task.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectHttpService} from '../../shared/services/http/project-http.service';
import {UsersHttpService} from '../../shared/services/http/users-http.service';
import {ProjectService} from '../../shared/services/project.service';
import {UserService} from '../../shared/services/user.service';
import {UsersService} from '../../shared/services/users.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  mode: string;
  projectId: number;
  users = [];
  project: ProjectInterface;
  contributors: SimpleUserInterface[] = [];
  tasks: TaskInterface[] = [];
  selectedTask: TaskInterface;
  display = {details: false, edit: false, new: false};

  constructor(private projectHttpService: ProjectHttpService,
              private usersHttpService: UsersHttpService,
              private projectService: ProjectService,
              private usersService: UsersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectId = +this.route.snapshot.paramMap.get('id');
    this.mode = this.route.snapshot.paramMap.get('mode');

    this.refreshProject();

    this.usersHttpService.getUsers().subscribe(
      (response) => {
        console.log('users: ');
        console.log(response);
        for (let u of response._embedded.users) {
          this.users.push(this.usersService.userROtoSimpleUser(u));
        }
        console.log(this.users);
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
    task.assignee = 'http://localhost:8080/users/' + task.assignee;
    task.project = 'http://localhost:8080/project/' + task.project;
    this.projectHttpService.saveTask(task).subscribe(
      (response) => {
        console.log(response);
        this.refreshProject();
      }
    );
    this.display = {details: false, edit: false, new: false};
  }

  onTaskDelete(task: TaskInterface){
    this.projectHttpService.removeTaskById(task.id).subscribe(
      (response) => {
        console.log(response);
      }
    );
    this.refreshProject();
    console.log('Delete');
    console.log(task);
  }

  isEditable(){
    return this.mode === 'edit';
  }

  refreshProject(){
    this.projectHttpService.getProjectById(this.projectId).subscribe(
      (response) => {
        this.project = this.projectService.projectROtoProject(response);
        console.log(response);
        console.log(this.project);
        if (this.project.tasks !== undefined) {
          this.projectHttpService.getTasks(this.project.tasks.href).subscribe(
            (tasks) => {
              for (let t of tasks._embedded.tasks) {
                this.tasks.push(this.projectService.taskROtoTask(t));
              }
              console.log(this.tasks);
            }
          );
        } else {
          this.project.tasks = {href: ''};
        }
        if (this.project.contributors.href !== undefined ){
          this.usersHttpService.getUsersByHref(this.project.contributors.href).subscribe(
            (cont) => {
              for (const c of cont._embedded.users){
                this.contributors.push(this.usersService.userROtoSimpleUser(c));
              }
            }
          );
          console.log(this.tasks);
        }
      }, (error) => {
        console.log(error);
      }
    );
  }
}

