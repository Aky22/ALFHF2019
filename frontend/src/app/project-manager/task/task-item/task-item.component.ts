import {Component, Input, OnInit} from '@angular/core';
import {TaskInterface} from '../../../shared/model/interfaces/task.interface';
import {UsersService} from '../../../shared/services/users.service';
import {SimpleUserInterface} from '../../../shared/model/interfaces/user.interface';
import {TaskService} from '../../../shared/services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: TaskInterface;
  accountableUser: SimpleUserInterface;

  constructor(private usersService: UsersService,
              private taskService: TaskService) { }

  ngOnInit() {
    this.accountableUser = this.usersService.getSimpleUserById(this.task.accountableId);
  }

  onSelect() {
    console.log('Selected: ');
    console.log(this.task);
  }

  onDelete(){
    this.taskService.deleteTAsk(this.task);
  }

}
