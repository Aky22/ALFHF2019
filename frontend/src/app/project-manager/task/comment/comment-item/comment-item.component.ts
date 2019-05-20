import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentInterface} from '../../../../shared/model/interfaces/comment.interface';
import {SimpleUserInterface} from '../../../../shared/model/interfaces/user.interface';
import {UsersService} from '../../../../shared/services/users.service';
import {UsersHttpService} from '../../../../shared/services/http/users-http.service';
import {ProjectHttpService} from '../../../../shared/services/http/project-http.service';
import {UserHttpService} from '../../../../shared/services/http/user-http.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {
  @Input() comment: CommentInterface;
  @Output() delete = new EventEmitter();
  user: SimpleUserInterface;
  currentUser: SimpleUserInterface;

  constructor(private usersService: UsersService,
              private usersHttpService: UsersHttpService,
              private userHttpService: UserHttpService,
              private projectHttpService: ProjectHttpService) { }

  ngOnInit() {
    this.userHttpService.getUser().subscribe(
      (user) => {
        this.currentUser = user;
      }
    );
    this.usersHttpService.getUser(this.comment.user).subscribe(
      (response) => {
        this.user = this.usersService.userROtoSimpleUser(response);
      }
    );
  }

  onRemove(){
    this.projectHttpService.removeCommentById(this.comment.id).subscribe(
      (response) => {
        this.delete.emit();
      }
    );
  }

}
