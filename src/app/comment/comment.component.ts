import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from "../model/Comment";
import {PostService} from "../service/post.service";
import {Post} from "../model/Post";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor(private postService: PostService) {
  }

  @Input() public comment!: Comment;
  ngOnInit(): void {
  }

  commentPost() {

  }
}
