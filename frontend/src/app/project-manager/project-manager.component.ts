import { Component, OnInit } from '@angular/core';
import {TaskInterface} from '../shared/model/interfaces/task.interface';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {
  task: TaskInterface = {
    name: 'Task1', description: 'Task1 description', assignee: 1, deadline: new Date(), project: 1, id: 1
  };

  constructor() { }

  ngOnInit() {
  }

}
