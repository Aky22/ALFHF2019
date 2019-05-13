import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommentInterface} from '../../../../shared/model/interfaces/comment.interface';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {
  @Output() commented = new EventEmitter<CommentInterface>();
  comment: CommentInterface;
  constructor() { }

  ngOnInit() {
    this.comment = {
      message: ''
    };
  }

  onSend(){
    this.commented.emit(this.comment);
    this.comment = {
      message: ''
    };
  }

}
