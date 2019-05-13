import {Component, Input, OnInit} from '@angular/core';
import {ProjectInterface} from '../../shared/model/interfaces/project.interface';
import {SimpleUserInterface} from '../../shared/model/interfaces/user.interface';
import {TaskInterface} from '../../shared/model/interfaces/task.interface';
import {ProjectService} from '../../shared/services/project.service';
import {UsersService} from '../../shared/services/users.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  mode: string;
  projectId: number;
  users: SimpleUserInterface[];
  project: ProjectInterface;
  contributors: SimpleUserInterface[] = [];
  tasks: TaskInterface[] = [];
  selectedTask: TaskInterface;
  display = {details: false, edit: false, new: false};

  constructor(private projectService: ProjectService,
              private usersService: UsersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.users = this.usersService.getSimpleUsers();
    this.projectId = +this.route.snapshot.paramMap.get('id');
    this.mode = this.route.snapshot.paramMap.get('mode');
    this.project = this.projectService.getProjectById(this.projectId);
    this.tasks = this.projectService.getProjectsTask(this.project.id);
    console.log(this.tasks);
    for (const contr of this.project.contributorIds){
      this.contributors.push(this.usersService.getSimpleUserById(contr));
    }
  }

  onBack(){
    this.router.navigate(['/project-manager/list']);
  }

  onSave(){
    // TODO
    this.projectService.saveProject(this.project);
    this.router.navigate(['/project-manager/list']);
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

