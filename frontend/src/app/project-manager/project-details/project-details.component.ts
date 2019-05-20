import {Component, OnInit} from '@angular/core';
import {ProjectInterface} from '../../shared/model/interfaces/project.interface';
import {SimpleUserInterface, UserInterface} from '../../shared/model/interfaces/user.interface';
import {TaskInterface} from '../../shared/model/interfaces/task.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectHttpService} from '../../shared/services/http/project-http.service';
import {UsersHttpService} from '../../shared/services/http/users-http.service';
import {ProjectService} from '../../shared/services/project.service';
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
    if (this.project.id !== undefined){
      this.projectHttpService.saveProject(this.project).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/project-manager/list']);

        }
      );
    } else {
      this.projectHttpService.updateProject(this.project).subscribe(
        (response) => {
          console.log('update');
          console.log(response);
        }
      );
    }

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
    this.selectedTask = undefined;
    this.display = {details: false, edit: false, new: false};
  }

  onTaskSave(task: TaskInterface){
    task.assignee = 'http://localhost:8080/users/' + task.assignee;
    task.project = 'http://localhost:8080/projects/' + task.project;
    const taskTemp: TaskInterface = {
      id: task.id,
      deadline: task.deadline,
      name: task.name,
      description: task.description,
      project: task.project,
      assignee: task.assignee
    };
    console.log(taskTemp);
    if (task.id !== undefined) {
      console.log(taskTemp);
      this.projectHttpService.updateTask(taskTemp).subscribe(
        (response) => {
          this.display = {details: false, edit: false, new: false};
          this.refreshProject();
        }
      );
    } else {
      this.projectHttpService.saveTask(taskTemp).subscribe(
        (response) => {
          this.display = {details: false, edit: false, new: false};
          this.refreshProject();
        }
      );
    }
  }

  onTaskDelete(task: TaskInterface){
    this.projectHttpService.removeTaskById(task.id).subscribe(
      (response) => {
        this.projectHttpService.removeTaskById(task.id).subscribe(
          (rem) => {
            console.log('Delete Task: ');
            console.log(rem);
            this.refreshProject();
          }
        );
      }
    );
    this.refreshProject();
  }

  isEditable(){
    return this.mode === 'edit';
  }

  refreshProject(){
    this.projectHttpService.getProjectById(this.projectId).subscribe(
      (response) => {
        this.tasks = [];
        this.project = this.projectService.projectROtoProject(response);
        if (this.project.tasks !== undefined) {
          this.projectHttpService.getTasks(this.project.tasks.href).subscribe(
            (tasks) => {
              for (let t of tasks._embedded.tasks) {
                this.tasks.push(this.projectService.taskROtoTask(t));
              }
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
        }
      }, (error) => {
        console.log(error);
      }
    );
  }
}

