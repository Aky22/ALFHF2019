import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskInterface} from '../../../shared/model/interfaces/task.interface';
import {SimpleUserInterface} from '../../../shared/model/interfaces/user.interface';
import {UsersService} from '../../../shared/services/users.service';
import {TaskService} from '../../../shared/services/task.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CommentInterface} from '../../../shared/model/interfaces/comment.interface';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  @Input() task: TaskInterface;
  @Input() mode: Mode;
  @Input() projectId: number;
  @Output() saveTask = new EventEmitter<TaskInterface>();
  @Output() cancel = new EventEmitter();
  accountableUser: SimpleUserInterface;
  simpleUsers: SimpleUserInterface[];
  taskForm: FormGroup;
  isSelectAccountable = false;
  comments: CommentInterface[] = [];

  constructor(private usersService: UsersService,
              private taskService: TaskService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.simpleUsers = this.usersService.getSimpleUsers();
    console.log(this.mode);
    if (this.mode === Mode.Create){
      this.task = {
        name: '',
        deadline: new Date(),
        assignee: -1,
        description: '',
        project: this.projectId
      };
      this.accountableUser = {username: '', id: -1, email: ''};
    } else {
      this.accountableUser = this.usersService.getSimpleUserById(this.task.assignee);
      this.comments = this.taskService.getTaskComments(this.task.id);
    }
    if (this.mode === undefined) {
      this.mode = Mode.Details;
    }


    this.taskForm = this.fb.group({
      'name': new FormControl({value: this.task.name, disabled: this.mode === Mode.Details}, Validators.required),
      'deadline': new FormControl({value: this.task.deadline, disabled: this.mode === Mode.Details}, Validators.required),
      'accountableUser': new FormControl({value: this.accountableUser, disabled: this.mode === Mode.Details}, Validators.required),
      'description': new FormControl({value: this.task.description, disabled: this.mode === Mode.Details})
    });
  }

  onSubmit() {
    this.task.assignee = this.accountableUser.id;
    this.saveTask.emit(this.task);
  }

  onCancel(){
    this.cancel.emit();
  }

  onDelete(){
    this.taskService.deleteTAsk(this.task);
  }

  onNewComment(comment: CommentInterface){
    comment.task = this.task.id;
    // TODo
    comment.user = 1;
    this.taskService.addComment(comment);
  }

}

enum Mode {
  Details = 'Details',
  Edit = 'Edit',
  Create = 'Create',
}
