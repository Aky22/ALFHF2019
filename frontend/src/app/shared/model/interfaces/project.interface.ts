export interface ProjectInterface {
  id?: number;
  name: string;
  description: string;
  deadline: Date; // or date
  contributorIds: number[];
}

export interface SimpleProjectInterface {
  id?: number;
  name: string;
  deadline: Date;
}
