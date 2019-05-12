import {Component, Input, OnInit} from '@angular/core';
import {TaskInterface} from '../../../shared/model/interfaces/task.interface';
import {SimpleUserInterface} from '../../../shared/model/interfaces/user.interface';
import {UsersService} from '../../../shared/services/users.service';
import {TaskService} from '../../../shared/services/task.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  @Input() task: TaskInterface;
  @Input() mode: Mode;
  @Input() projectId: number;
  accountableUser: SimpleUserInterface;
  simpleUsers: SimpleUserInterface[];
  taskForm: FormGroup;
  isSelectAccountable = false;

  constructor(private usersService: UsersService,
              private taskService: TaskService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.simpleUsers = this.usersService.getSimpleUsers();
    if (this.task === undefined || this.mode === Mode.Create){
      this.task = {
        name: '',
        deadline: new Date(),
        accountableId: -1,
        description: '',
        projectId: this.projectId
      };
      this.accountableUser = {username: '', id: -1, email: ''};
    } else {
      this.accountableUser = this.usersService.getSimpleUserById(this.task.accountableId);
    }
    if (this.mode === undefined) {
      this.mode = Mode.View;
    }


    this.taskForm = this.fb.group({
      'name': new FormControl({value: this.task.name, disabled: this.mode === Mode.View}, Validators.required),
      'deadline': new FormControl({value: this.task.deadline, disabled: this.mode === Mode.View}, Validators.required),
      'accountableUser': new FormControl({value: this.accountableUser, disabled: this.mode === Mode.View}, Validators.required),
      'description': new FormControl({value: this.task.description, disabled: this.mode === Mode.View})
    });
  }

  onSubmit() {
    this.task.accountableId = this.accountableUser.id;
    this.taskService.saveTask(this.task);
  }

  onDelete(){
    this.taskService.deleteTAsk(this.task);
  }

}

enum Mode {
  'View' = 'View',
  'Edit' = 'Edit',
  'Create' = 'Create',
}
