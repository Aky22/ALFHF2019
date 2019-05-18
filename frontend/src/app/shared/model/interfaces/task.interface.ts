export interface TaskInterface{
  id?: number;
  name: string;
  description: string;
  deadline: Date;
  accountableId: number;
  projectId: number;
}
