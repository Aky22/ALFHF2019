import { Component, OnInit } from '@angular/core';
import {TaskInterface} from '../../shared/model/interfaces/task.interface';
import {TaskService} from '../../shared/services/task.service';
import {ProjectInterface} from '../../shared/model/interfaces/project.interface';
import {ProjectService} from '../../shared/services/project.service';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: ProjectInterface[];
  cols: any[];
  items: MenuItem[];
  constructor(private projectService: ProjectService,
              private router: Router) { }

  ngOnInit() {
    this.items = [
      {label: 'Edit', icon: 'pi pi-refresh', command: () => {
          this.onSelectEdit(null);
        }},
      {label: 'Delete', icon: 'pi pi-times', command: () => {
          this.onSelectRemove(null);
        }},
    ];
    this.projects = this.projectService.getProjects();
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'deadline', header: 'Deadline'}];
  }

  onSelectView(project: ProjectInterface){
    this.router.navigate(['/project-manager/details/view/' + project.id ]);
  }

  onSelectEdit(project: ProjectInterface){
    this.router.navigate(['/project-manager/details/edit/' + project.id ]);
  }

  onSelectRemove(project: ProjectInterface){
    this.projectService.removeProject(project.id);
    this.projects.splice(this.projects.indexOf(project), 1);
  }

  onNewProject(){
    this.router.navigate(['/project-manager/create']);
  }

  getItems(project: ProjectInterface){
    return [
      {label: 'Edit', icon: 'pi pi-pencil', command: () => {
          this.onSelectEdit(project);
        }},
      {label: 'Delete', icon: 'pi pi-times', command: () => {
          this.onSelectRemove(project);
        }},
    ];
  }

}
