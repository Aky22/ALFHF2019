import {TaskInterface} from './task.interface';

export interface ProjectInterface {
  id?: number;
  name: string;
  description: string;
  deadline: Date; // or date
  contributorIds: number[];
  tasks?: TaskInterface[];
}

export interface SimpleProjectInterface {
  id?: number;
  name: string;
  deadline: Date;
}
