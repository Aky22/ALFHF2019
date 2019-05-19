import {TaskInterface} from './task.interface';
import {UserInterface} from './user.interface';

export interface ProjectInterface {
  id?: number;
  name: string;
  description: string;
  deadline: Date; // or date
  contributors?: UserInterface[];
  tasks?: TaskInterface[];
}

export interface SimpleProjectInterface {
  id?: number;
  name: string;
  deadline: Date;
  description: string;
}

export interface ProjectsROInterface {
  _embedded: {
    projects: ProjectROInterface[]
  };
}

export interface ProjectROInterface {
  id: number;
  name: string;
  deadline: Date;
  description: string;
  _links: {
    contributors: {href: string};
    projects: {href: string};
    self: {href: string};
    tasks: {href: string}
  };
}
