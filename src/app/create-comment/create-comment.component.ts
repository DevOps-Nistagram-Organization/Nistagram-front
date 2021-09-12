import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {PostService} from "../service/post.service";
import {UserInfo} from "../model/UserInfo";
import {Post} from "../model/Post";
import {AddComment} from "../model/AddComment";

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private postService: PostService) {
    this.commentForm = this.formBuilder.group({
      comment: ['', []],
    });
  }

  commentForm: FormGroup;
  @Input() post!: Post;
  @Output() public commentAdded: EventEmitter<Post> = new EventEmitter<Post>();
  ngOnInit(): void {
  }

  get commentText() {
    return this.commentForm.controls.comment.value as string;
  }

  commentPost() {
    let addComment = new AddComment(this.post.id, this.commentText);
    this.postService.comment(addComment).subscribe(
      response => {
        this.commentAdded.emit(response);
      }
    )
  }
}
