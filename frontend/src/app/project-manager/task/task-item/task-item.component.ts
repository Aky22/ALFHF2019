import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskInterface} from '../../../shared/model/interfaces/task.interface';
import {UsersService} from '../../../shared/services/users.service';
import {SimpleUserInterface} from '../../../shared/model/interfaces/user.interface';
import {TaskService} from '../../../shared/services/task.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: TaskInterface;
  @Input() mode: string;
  @Output() selectedDetails = new EventEmitter<TaskInterface>();
  @Output() selectedEdit = new EventEmitter<TaskInterface>();
  @Output() selectedDelete = new EventEmitter<TaskInterface>();
  items: MenuItem[] = [];

  accountableUser: SimpleUserInterface;

  constructor(private usersService: UsersService,
              private taskService: TaskService) { }

  ngOnInit() {
    if (this.isEditable()){
      this.items = [
        {label: 'Edit', icon: 'pi pi-refresh', command: () => {
            this.onSelectEdit();
          }},
        {label: 'Delete', icon: 'pi pi-times', command: () => {
            this.onSelectRemove();
          }},
      ];
    }

    this.accountableUser = this.usersService.getSimpleUserById(this.task.assignee);
  }

  onSelectDetails() {
    this.selectedDetails.emit(this.task);
  }

  onSelectEdit() {
    this.selectedEdit.emit(this.task);
  }

  onSelectRemove() {
    this.taskService.deleteTAsk(this.task);
    this.selectedDelete.emit(this.task);

  }

  isEditable(){
    return this.mode === 'edit';
  }
}
