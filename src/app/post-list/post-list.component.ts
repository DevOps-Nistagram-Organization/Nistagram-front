import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Post} from "../model/Post";
import {PostService} from "../service/post.service";
import {UserInfo} from "../model/UserInfo";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnChanges {
  constructor(private postService: PostService) {
  }

  @Input() typeOfPosts!: number;
  @Input() userInfo!: UserInfo;

  posts: Array<Post> = [];
  ngOnInit(): void {
    this.loadPosts()
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.loadPosts()
  }

  loadPosts() {
    if (this.typeOfPosts === 0) {
      this.postService.getMyPosts().subscribe(
        response => {
          this.posts = response;
        }
      );
    } else if (this.typeOfPosts === 1) {
      this.postService.getLiked().subscribe(
        response => {
          console.log(response);
          this.posts = response;
        }
      );
    } else if (this.typeOfPosts === 2) {
      this.postService.getSaved().subscribe(
        response => {
          this.posts = response;
        }
      );
    } else if (this.typeOfPosts === 3) {
      this.postService.getFeed().subscribe(
        response => {
          this.posts = response;
        }
      );
    }
  }

}
