import { Injectable } from '@angular/core';
import {TaskInterface} from '../model/interfaces/task.interface';
import {CommentInterface} from '../model/interfaces/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  comments: CommentInterface[] = [];

  constructor() {

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

}
