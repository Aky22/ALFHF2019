export interface TaskInterface{
  id?: number;
  name: string;
  description: string;
  deadline: Date;
  assignee: number;
  project: number;
}
