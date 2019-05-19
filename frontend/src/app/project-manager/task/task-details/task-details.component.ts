import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskInterface} from '../../../shared/model/interfaces/task.interface';
import {SimpleUserInterface, UserInterface} from '../../../shared/model/interfaces/user.interface';
import {UsersService} from '../../../shared/services/users.service';
import {TaskService} from '../../../shared/services/task.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CommentInterface} from '../../../shared/model/interfaces/comment.interface';
import {UsersHttpService} from '../../../shared/services/http/users-http.service';
import {ProjectHttpService} from '../../../shared/services/http/project-http.service';
import {ProjectService} from '../../../shared/services/project.service';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  @Input() taskId: number;
  @Input() mode: Mode;
  @Input() projectId: number;
  @Output() saveTask = new EventEmitter<TaskInterface>();
  @Output() cancel = new EventEmitter();
  task: TaskInterface;
  assignee: UserInterface;
  simpleUsers: SimpleUserInterface[] = [];
  taskForm: FormGroup;
  isSelectAccountable = false;
  comments: CommentInterface[] = [];

  constructor(private usersService: UsersService,
              private usersHttpService: UsersHttpService,
              private userService: UserService,
              private projectHttpService: ProjectHttpService,
              private projectService: ProjectService,
              private taskService: TaskService,
              private fb: FormBuilder) { }

  ngOnInit() {
    if (this.taskId === undefined) {
      this.task = {
        name: '',
        description: '',
        deadline: new Date(),
        assignee: '',
        project: ''
      };
    } else {
      this.projectHttpService.getTaskById(this.taskId).subscribe(
        (response) => {
          this.task = this.projectService.taskROtoTask(response);
        }
      );
    }
    this.usersHttpService.getUsers().subscribe(
      (response) => {
        for (let u of response._embedded.users) {
          this.simpleUsers.push(this.usersService.userROtoSimpleUser(u));
        }
      }
    );
    if (this.mode === Mode.Create){
      this.assignee = this.userService.getUser();
    } else {
      this.usersHttpService.getUser(this.task.assignee).subscribe(
        (response) => {
          this.assignee = this.usersService.userROtoUser(response);
        }
      );
    }
    if (this.mode === undefined) {
      this.mode = Mode.Details;
    }

    // TODO comments


    this.taskForm = this.fb.group({
      'name': new FormControl({value: this.task.name, disabled: this.mode === Mode.Details}, Validators.required),
      'deadline': new FormControl({value: this.task.deadline, disabled: this.mode === Mode.Details}, Validators.required),
      'assignee': new FormControl({value: this.assignee, disabled: this.mode === Mode.Details}, Validators.required),
      'description': new FormControl({value: this.task.description, disabled: this.mode === Mode.Details})
    });
  }

  onSubmit() {
    this.task.name = this.taskForm.value.name;
    this.task.description = this.taskForm.value.description;
    this.task.deadline = this.taskForm.value.deadline;
    this.task.assignee = this.taskForm.value.assignee.id;
    this.task.project = this.projectId + '';
    console.log(this.task);
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
