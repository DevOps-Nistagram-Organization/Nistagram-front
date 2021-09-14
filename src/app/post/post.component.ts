import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../model/Post";
import {AuthService} from "../service/auth.service";
import {UserInfo} from "../model/UserInfo";
import {PostService} from "../service/post.service";
import {PostIdWrapper} from "../model/PostIdWrapper";
import {AdminService} from "../service/admin.service";
import {ReportPost} from "../model/ReportPost";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private authService: AuthService,
              private postService: PostService,
              private adminService: AdminService,
              private snackBar: MatSnackBar) {
  }

  @Input() post!: Post;
  @Input() userInfo!: UserInfo;
  @Input() url: string | undefined;

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  like() {
    this.postService.like(new PostIdWrapper(this.post.id)).subscribe(
      response => {
        this.post = response;
      }
    );
  }

  unlike() {
    this.postService.unlike(new PostIdWrapper(this.post.id)).subscribe(
      response => {
        this.post = response;
      }
    );
  }

  dislike() {
    this.postService.dislike(new PostIdWrapper(this.post.id)).subscribe(
      response => {
        this.post = response;
      }
    );
  }

  undislike() {
    this.postService.undislike(new PostIdWrapper(this.post.id)).subscribe(
      response => {
        this.post = response;
      }
    );
  }

  favourite() {
    this.postService.favourite(new PostIdWrapper(this.post.id)).subscribe(
      response => {
        this.post = response;
      }
    );
  }

  unfavourite() {
    this.postService.unfavourite(new PostIdWrapper(this.post.id)).subscribe(
      response => {
        this.post = response;
      }
    );
  }

  isLiked(): boolean {
    for (let user of this.post.likedByUsers) {
      if (user === this.userInfo.username) {
        return true;
      }
    }
    return false
  }

  isDisliked() {
    for (let user of this.post.dislikedByUsers) {
      if (user === this.userInfo.username) {
        return true;
      }
    }
    return false
  }

  isFavourite() {
    for (let user of this.post.favouredByUsers) {
      if (user === this.userInfo.username) {
        return true;
      }
    }
    return false
  }

  commentAdded(post: Post) {
    console.log(post);
    this.post = post;
  }

  imageClick() {
    if (this.url) {
      window.open(this.url);
    }
  }

  report() {
    let reportPost = new ReportPost(this.post.id);
    this.adminService.reportPost(reportPost).subscribe(
      response => {
        this.snackBar.open("Thank you for reporing");
      }
    );
  }
}
