export interface TaskInterface{
  id?: number;
  name: string;
  description: string;
  deadline: Date;
  assignee: string;
  project: string;
  comments?: string;
}

export interface TasksROInterface {
  _embedded: {
    tasks: TaskROInterface[];
  };
}

export interface TaskROInterface {
  id: number;
  name: string;
  description: string;
  deadline: Date;
  _links: {
    assignee: {href: string};
    project: {href: string};
    comments: {href: string};
  };
}
