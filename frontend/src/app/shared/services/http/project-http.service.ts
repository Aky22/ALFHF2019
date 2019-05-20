import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProjectInterface, ProjectROInterface, ProjectsROInterface, SimpleProjectInterface} from '../../model/interfaces/project.interface';
import {UserInterface} from '../../model/interfaces/user.interface';
import {TaskInterface, TaskROInterface, TasksROInterface} from '../../model/interfaces/task.interface';
import {CommentInterface, CommentsROInterface} from '../../model/interfaces/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectHttpService {
  url = 'http://localhost:8080/projects';
  urlTask = 'http://localhost:8080/tasks';
  urlComment = 'http://localhost:8080/comments';

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

  updateProject(project: ProjectInterface | SimpleProjectInterface) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: project
    };
    return this.httpClient.patch(this.url + '/' + project.id,  project);
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

  updateTask(task: TaskInterface) {
    return this.httpClient.patch(this.urlTask + '/' + task.id,  task);
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

  getComments(href: string) {
    return this.httpClient.get<CommentsROInterface>(href);
  }

  saveComment(comment: CommentInterface){
    return this.httpClient.post(this.urlComment, comment);
  }

  removeCommentById(id: number){
    return this.httpClient.delete(this.urlComment + 'id');
  }

  setContributorsById(projectId: number, contributors: string){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'text/uri-list' }),
    };
    return this.httpClient.put(this.url + '/' + projectId + '/contributors', contributors, httpOptions);
  }
}
