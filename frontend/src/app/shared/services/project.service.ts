import { Injectable } from '@angular/core';
import {ProjectInterface, ProjectROInterface, SimpleProjectInterface} from '../model/interfaces/project.interface';
import {ProjectHttpService} from './http/project-http.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private projectHttpService: ProjectHttpService) {
  }

  projectROtoProject(ro: ProjectROInterface): ProjectInterface {
    return {
      id: ro.id,
      name: ro.name,
      deadline: ro.deadline,
      description: ro.description
    };
  }

  projectROtoSimpleProject(ro: ProjectROInterface): SimpleProjectInterface {
    return {
      id: ro.id,
      name: ro.name,
      deadline: ro.deadline,
      description: ro.description
    };
  }







}
