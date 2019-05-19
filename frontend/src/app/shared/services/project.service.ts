import { Injectable } from '@angular/core';
import {ProjectInterface, ProjectROInterface, SimpleProjectInterface} from '../model/interfaces/project.interface';
import {ProjectHttpService} from './http/project-http.service';
import {TaskInterface, TaskROInterface} from '../model/interfaces/task.interface';
import {CommentInterface, CommentROInterface} from '../model/interfaces/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private projectHttpService: ProjectHttpService) {
  }

  projectROtoProject(ro: ProjectROInterface): ProjectInterface {
    return {
      id: ro.id,
      name: ro.name,
      deadline: new Date(ro.deadline),
      description: ro.description,
      contributors: ro._links.contributors,
      tasks: ro._links.tasks
    };
  }

  projectROtoSimpleProject(ro: ProjectROInterface): SimpleProjectInterface {
    return {
      id: ro.id,
      name: ro.name,
      deadline: new Date(ro.deadline),
      description: ro.description
    };
  }

  taskROtoTask(ro: TaskROInterface): TaskInterface {
    return {
      id: ro.id,
      name: ro.name,
      deadline: new Date(ro.deadline),
      description: ro.description,
      project: ro._links.project.href,
      assignee: ro._links.assignee.href,
      comments: ro._links.comments.href,
    };
  }

  commentROtoComment(ro: CommentROInterface): CommentInterface {
    return {
      id: ro.id,
      content: ro.content,
      user: ro._links.user.href,
      project: ro._links.project.href,
      task: ro._links.task.href
    };
  }
}
