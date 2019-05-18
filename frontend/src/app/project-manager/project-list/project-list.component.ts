import { Component, OnInit } from '@angular/core';
import {ProjectInterface} from '../../shared/model/interfaces/project.interface';
import {ProjectService} from '../../shared/services/project.service';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {ProjectHttpService} from '../../shared/services/http/project-http.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: ProjectInterface[];
  cols: any[];
  items: MenuItem[];
  constructor(private projectHttpService: ProjectHttpService,
              private router: Router) { }

  ngOnInit() {
    this.refreshProjects();
    this.items = [
      {label: 'Edit', icon: 'pi pi-refresh', command: () => {
          this.onSelectEdit(null);
        }},
      {label: 'Delete', icon: 'pi pi-times', command: () => {
          this.onSelectRemove(null);
        }},
    ];
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
    this.projectHttpService.deleteProjectById(project.id);
    this.refreshProjects();
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

  refreshProjects(){
    this.projectHttpService.getAllProject().subscribe(
      (response) =>{
        this.projects = response;
      }, (error) => {
        console.log(error);
      }
    );
  }

}
