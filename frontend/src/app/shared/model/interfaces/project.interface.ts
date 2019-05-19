
export interface ProjectInterface {
  id?: number;
  name: string;
  description: string;
  deadline: Date;
  contributors: {href: string};
  tasks: {href: string};
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
