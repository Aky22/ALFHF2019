import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProjectInterface, ProjectsROInterface, SimpleProjectInterface} from '../../model/interfaces/project.interface';
import {UserInterface} from '../../model/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectHttpService {
  url = 'http://localhost:8080/projects';

  constructor(private httpClient: HttpClient) { }

  getAllProject(){
    return this.httpClient.get<ProjectsROInterface>(this.url);
  }

  getProjectById(id: number) {
    return this.httpClient.get<ProjectInterface>(this.url + '/' + id);
  }

  saveProject(data: ProjectInterface){
    return this.httpClient.post<ProjectInterface>(this.url, data);
  }

  deleteProjectById(id: number){
    return this.httpClient.delete(this.url + '/' + id);
  }

  updateProject(project: ProjectInterface) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: project
    };
    return this.httpClient.put(this.url + '/' + project.id,  httpOptions);
  }

  getContributors(href: string){
    return this.httpClient.get<UserInterface[]>(href);
  }

  getTasks(href: string){
    return this.httpClient.get<UserInterface[]>(href);
  }

  getProject(href: string){
    return this.httpClient.get<UserInterface[]>(href);
  }
}
