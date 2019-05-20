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
    if (this.mode === Mode.Create) {
      this.assignee = this.userService.getUser();
      this.task = {
        name: '',
        description: '',
        deadline: new Date(),
        assignee: '',
        project: ''
      };
      this.refreshTaskForm();
    } else {
      this.projectHttpService.getTaskById(this.taskId).subscribe(
        (response) => {
          this.task = this.projectService.taskROtoTask(response);
          this.refreshAssignee();
          this.refreshComments();
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
    comment.task = 'http://localhost:8080/tasks/' + this.task.id;
    comment.project = 'http://localhost:8080/projects/' + this.projectId;
    comment.user = 'http://localhost:8080/users/' + this.userService.getUser().id;
    this.projectHttpService.saveComment(comment).subscribe(
      (response) => {
        this.refreshComments();
      }
    );
  }

  onDeleteComment(comment: CommentInterface) {
    this.projectHttpService.removeCommentById(comment.id).subscribe(
      (response) => {
        this.refreshComments();
      }
    );
  }

  refreshComments(){
    this.projectHttpService.getComments(this.task.comments).subscribe(
      (response) => {
        this.comments = [];
        for (const c of response._embedded.comments){
          this.comments.push(this.projectService.commentROtoComment(c));
        }
      }
    );
  }

  refreshAssignee() {
    this.usersHttpService.getUser(this.task.assignee).subscribe(
      (response) => {
        console.log('user:');
        console.log(response);
        this.assignee = this.usersService.userROtoUser(response);
        this.refreshTaskForm();
        console.log(this.assignee);
      }
    );
  }

  refreshTaskForm(){
    this.taskForm = this.fb.group({
      'name': new FormControl({value: this.task.name, disabled: this.mode === Mode.Details}, Validators.required),
      'deadline': new FormControl({value: this.task.deadline, disabled: this.mode === Mode.Details}, Validators.required),
      'assignee': new FormControl({value: this.assignee, disabled: this.mode === Mode.Details}, Validators.required),
      'description': new FormControl({value: this.task.description, disabled: this.mode === Mode.Details})
    });
  }

}



enum Mode {
  Details = 'Details',
  Edit = 'Edit',
  Create = 'Create',
}
