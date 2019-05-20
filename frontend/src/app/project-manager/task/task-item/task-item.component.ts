import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskInterface} from '../../../shared/model/interfaces/task.interface';
import {UsersService} from '../../../shared/services/users.service';
import {SimpleUserInterface} from '../../../shared/model/interfaces/user.interface';
import {MenuItem} from 'primeng/api';
import {ProjectService} from '../../../shared/services/project.service';
import {ProjectHttpService} from '../../../shared/services/http/project-http.service';
import {UsersHttpService} from '../../../shared/services/http/users-http.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() taskId: number;
  @Input() mode: string;
  @Output() selectedDetails = new EventEmitter<TaskInterface>();
  @Output() selectedEdit = new EventEmitter<TaskInterface>();
  @Output() selectedDelete = new EventEmitter<TaskInterface>();
  assignee: SimpleUserInterface;
  task: TaskInterface;
  items: MenuItem[] = [];

  constructor(private usersService: UsersService,
              private projectService: ProjectService,
              private projectHttpService: ProjectHttpService,
              private usersHttpService: UsersHttpService) { }

  ngOnInit() {
    this.projectHttpService.getTaskById(this.taskId).subscribe(
      (response) => {
        this.task = this.projectService.taskROtoTask(response);
        this.usersHttpService.getUser(this.task.assignee).subscribe(
          (user) => {
            this.assignee = this.usersService.userROtoSimpleUser(user);
          }
        );
      }
    );
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
  }

  onSelectDetails() {
    this.selectedDetails.emit(this.task);
  }

  onSelectEdit() {
    this.selectedEdit.emit(this.task);
  }

  onSelectRemove() {
    this.selectedDelete.emit(this.task);

  }

  isEditable(){
    return this.mode === 'edit';
  }
}
