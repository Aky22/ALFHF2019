import { Injectable } from '@angular/core';
import {TaskInterface} from '../model/interfaces/task.interface';
import {CommentInterface} from '../model/interfaces/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  comments: CommentInterface[] = [];

  constructor() {
    for (let i = 0; i < 6; i++) {
      this.comments.push({
        content: 'Comment ' + i + ' message!', user: 1, id: i, task: 1, project: 0
      });
    }
  }

  saveTask(task: TaskInterface){
    console.log('Task saved: ');
    console.log(task);
    // TODO
  }

  deleteTAsk(task: TaskInterface){
    console.log('Task deleted: ');
    console.log(task);
    // TODO
  }

  getTaskComments(id: number){
    for (let c of this.comments){
      c.task = id;
    } return this.comments;

  }

  addComment(comment: CommentInterface){
    this.comments.push(comment);
  }
}
