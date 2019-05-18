import { Injectable } from '@angular/core';
import {ProjectInterface} from '../model/interfaces/project.interface';
import {TaskInterface} from '../model/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: ProjectInterface[] = [];

  constructor() {
    this.projects.push({id: 1, name: 'Teszt1', contributorIds: [1, 2], deadline: new Date(), description: 'Teszt 1'});
    this.projects.push({id: 2, name: 'Teszt2', contributorIds: [1], deadline: new Date(), description: 'Teszt 2'});
    this.projects.push({id: 3, name: 'Teszt3', contributorIds: [], deadline: new Date(), description: 'Teszt 3'});

  }

  getProjects(){
    return this.projects;
    // TODO
  }

  getProjectById(id: number){
    for(let p of this.projects){
      if (p.id === id){
        return p;
      }
    }
    return null;
    // TODO
  }

  saveProject(data: ProjectInterface){
    if (this.projects.includes(this.getProjectById(data.id))){
      this.projects[this.projects.indexOf(this.getProjectById(data.id))] = data;
    } else {
      data.id = this.projects.length * 10 + 1;
      this.projects.push(data);
    }
    // TODO
  }

  removeProject(id: number){
    const pTemp = this.getProjectById(id);
    console.log(this.projects);
    this.projects.splice(this.projects.indexOf(pTemp), 0);
    console.log(this.projects);

  }

  getProjectsTask(projId: number){
    const tasks: TaskInterface[] = [];
    tasks.push({id: 1, name: 'Task1', description: 'Task1 desc', deadline: new Date(), accountableId: 1, projectId: projId});
    tasks.push({id: 2, name: 'Tas21', description: 'Tas2 desc', deadline: new Date(), accountableId: 2, projectId: projId});
    tasks.push({id: 3, name: 'Task3', description: 'Task3 desc', deadline: new Date(), accountableId: 1, projectId: projId});
    return tasks;
  }
}
