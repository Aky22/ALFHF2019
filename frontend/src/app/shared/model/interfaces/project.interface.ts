import {TaskInterface} from './task.interface';

export interface ProjectInterface {
  id?: number;
  name: string;
  description: string;
  deadline: Date; // or date
  contributors: number[];
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
