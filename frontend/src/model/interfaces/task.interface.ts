export interface TaskInterface{
  id?: number;
  description: string;
  deadline: string; // or date
  accountableId: number;
  projectId: number;
}
