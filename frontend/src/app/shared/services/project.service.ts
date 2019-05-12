import { Injectable } from '@angular/core';
import {ProjectInterface} from '../model/interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: ProjectInterface[] = [];

  constructor() {
    this.projects = [
      {id: 1, name: 'Teszt1', contributorIds: [1, 2], deadline: new Date(), description: 'Teszt 1'},
      {id: 2, name: 'Teszt2', contributorIds: [1], deadline: new Date(), description: 'Teszt 2'},
      {id: 3, name: 'Teszt3', contributorIds: [], deadline: new Date(), description: 'Teszt 3'},
    ];
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
      this.projects.push(data);
    }

    // TODO
  }

  removeProject(id: number){
    const pTemp = this.getProjectById(id);
    this.projects.splice(this.projects.indexOf(pTemp), 1);
  }


}
