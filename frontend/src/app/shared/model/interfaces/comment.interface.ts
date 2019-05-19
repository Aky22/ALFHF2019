export interface CommentInterface {
  id?: number;
  content: string;
  user?: any;
  project?: string;
  task?: string;
}

export interface CommentsROInterface {
  _embedded: {
    comments: CommentROInterface[];
  };
}

export interface CommentROInterface {
    id: number;
    content: string;
    _links: {
      user: {href: string};
      project: {href: string};
      task: {href: string};
    };
}
