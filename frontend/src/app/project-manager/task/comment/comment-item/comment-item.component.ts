import {Component, Input, OnInit} from '@angular/core';
import {CommentInterface} from '../../../../shared/model/interfaces/comment.interface';
import {SimpleUserInterface} from '../../../../shared/model/interfaces/user.interface';
import {UsersService} from '../../../../shared/services/users.service';
import {UsersHttpService} from '../../../../shared/services/http/users-http.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {
  @Input() comment: CommentInterface;
  user: SimpleUserInterface;

  constructor(private usersService: UsersService,
              private usersHttpService: UsersHttpService) { }

  ngOnInit() {
    this.usersHttpService.getUser(this.comment.user).subscribe(
      (response) => {
        this.user = this.usersService.userROtoSimpleUser(response);
      }
    );
  }

}
