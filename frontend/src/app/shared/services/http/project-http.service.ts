import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProjectInterface, ProjectROInterface, ProjectsROInterface, SimpleProjectInterface} from '../../model/interfaces/project.interface';
import {UserInterface} from '../../model/interfaces/user.interface';
import {TaskInterface, TaskROInterface, TasksROInterface} from '../../model/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectHttpService {
  url = 'http://localhost:8080/projects';
  urlTask = 'http://localhost:8080/tasks';

  constructor(private httpClient: HttpClient) { }

  getAllProject(){
    return this.httpClient.get<ProjectsROInterface>(this.url);
  }

  getProjectById(id: number) {
    return this.httpClient.get<ProjectROInterface>(this.url + '/' + id);
  }

  saveProject(data: SimpleProjectInterface) {
    return this.httpClient.post<ProjectROInterface>(this.url, {name: data.name, description: data.description, deadline: data.deadline});
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

  getTask(href: string){
    return this.httpClient.get<TaskROInterface>(href);
  }

  getTasks(href: string){
    return this.httpClient.get<TasksROInterface>(href);
  }

  saveTask(task: TaskInterface){
    return this.httpClient.post(this.urlTask, task);
  }

  getTaskById(id: number){
    return this.httpClient.get<TaskROInterface>('http://localhost:8080/tasks/' + id);
  }

  removeTaskById(id: number){
    return this.httpClient.delete(this.urlTask + '/' + id);
  }

  removeTask(href: string){
    return this.httpClient.delete(href);
  }

  getProject(href: string){
    return this.httpClient.get<ProjectROInterface>(href);
  }

  removeProjectById(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
