import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProjectInterface, SimpleProjectInterface} from '../../model/interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectHttpService {
  url = '';

  constructor(private httpClient: HttpClient) { }

  getProjectById(id: number){
    return this.httpClient.get<ProjectInterface>(this.url + 'project/' + id);
  }

  getSimpleProjects(){
    return this.httpClient.get<SimpleProjectInterface[]>(this.url + 'simple-projects');
  }

  saveProject(data: ProjectInterface){
    return this.httpClient.post<ProjectInterface>(this.url + 'save-project', data);
  }

  deleteProjectById(id: number){
    return this.httpClient.delete(this.url + 'remove/' + id);
  }
}
