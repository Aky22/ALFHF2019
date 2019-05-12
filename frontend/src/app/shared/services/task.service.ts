import { Injectable } from '@angular/core';
import {TaskInterface} from '../model/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

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
