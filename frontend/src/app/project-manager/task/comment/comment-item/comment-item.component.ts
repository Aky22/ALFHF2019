import {Component, Input, OnInit} from '@angular/core';
import {CommentInterface} from '../../../../shared/model/interfaces/comment.interface';
import {SimpleUserInterface} from '../../../../shared/model/interfaces/user.interface';
import {UsersService} from '../../../../shared/services/users.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {
  @Input() comment: CommentInterface;
  user: SimpleUserInterface;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.user = this.usersService.getSimpleUserById(this.comment.user);
  }

}
