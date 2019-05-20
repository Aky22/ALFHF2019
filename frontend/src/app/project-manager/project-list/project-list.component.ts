import {Component, OnInit} from '@angular/core';
import {ProjectInterface, SimpleProjectInterface} from '../../shared/model/interfaces/project.interface';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {ProjectHttpService} from '../../shared/services/http/project-http.service';
import {ProjectService} from '../../shared/services/project.service';
import {UserService} from '../../shared/services/user.service';
import {Role} from '../../shared/model/enums/role.enum';
import {UserInterface} from '../../shared/model/interfaces/user.interface';
import {UsersService} from '../../shared/services/users.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: SimpleProjectInterface[];
  cols: any[];
  items: MenuItem[];
  user: UserInterface;
  constructor(private projectHttpService: ProjectHttpService,
              private projectService: ProjectService,
              private userService: UserService,
              private usersService: UsersService,
              private router: Router) { }

  ngOnInit() {
    this.userService.getUserHttp().subscribe(
      (response) => {
        console.log(response);
        this.user = {
          id: response.id,
          email: response.email,
          username: response.username,
          role: response.role
        };
/*
        this.user = this.usersService.userROtoUser(response);
*/
        this.items = [
          {label: 'Edit', icon: 'pi pi-refresh', command: () => {
              this.onSelectEdit(null);
            }},
          {label: 'Delete', icon: 'pi pi-times', disabled: this.user.role === Role.Basic, command: () => {
              this.onSelectRemove(null);
            }},
        ];
        this.cols = [
          { field: 'name', header: 'Name' },
          { field: 'deadline', header: 'Deadline'}];
        this.refreshProjects();
      }
    );
  }

  onSelectView(project: ProjectInterface) {
    this.router.navigate(['/project-manager/details/view/' + project.id ]);
  }

  onSelectEdit(project: ProjectInterface) {
    this.router.navigate(['/project-manager/details/edit/' + project.id ]);
  }

  onSelectRemove(project: ProjectInterface) {
    this.projectHttpService.removeProjectById(project.id).subscribe(
      (response) => {
        console.log(response);
        this.refreshProjects();
      }, (error) => {
        console.log(error);
      }
    );
  }

  onNewProject() {
    this.router.navigate(['/project-manager/create']);
  }

  getItems(project: ProjectInterface) {
    return [
      {label: 'Edit', icon: 'pi pi-pencil', command: () => {
          this.onSelectEdit(project);
        }},
      {label: 'Delete', icon: 'pi pi-times', command: () => {
          this.onSelectRemove(project);
        }},
    ];
  }

  refreshProjects() {
    if (this.user.role !== undefined){
      console.log('kurvaanyad');
      if (this.user.role === Role.Admin) {
        console.log('kurvaanyad2');
        this.projectHttpService.getAllProject().subscribe(
          (response) => {
            this.projects = [];
            for (const project of response._embedded.projects) {
              this.projects.push(this.projectService.projectROtoSimpleProject(project));
            }
          }, (error) => {
            console.log(error);
          }
        );
      } else if (this.user.role === Role.Basic) {
        console.log('kurvaanyad3');
        console.log(this.user.projects.href);
        this.projectHttpService.getProjects(this.user.projects.href).subscribe(
          (response) => {
            console.log(response);
            this.projects = [];
            for (const project of response._embedded.projects) {
              this.projects.push(this.projectService.projectROtoSimpleProject(project));
            }
          }, (error) => {
            console.log(error);
          }
        );
      }
    }
  }

}
