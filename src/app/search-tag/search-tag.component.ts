import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";
import {AuthService} from "../service/auth.service";
import {UserInfo} from "../model/UserInfo";
import {Search} from "../model/Search";
import {PostService} from "../service/post.service";
import {Post} from "../model/Post";

@Component({
  selector: 'app-search-tag',
  templateUrl: './search-tag.component.html',
  styleUrls: ['./search-tag.component.scss']
})
export class SearchTagComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private datepipe: DatePipe,
              private authService: AuthService,
              private router: Router,
              private postService: PostService) {
  }

  searchResults: Array<Post> = [];
  myUserInfo!: UserInfo;
  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      this.getSearchResults();
    });
    if (this.authService.isLoggedIn()) {
      this.userService.getMyInfo().subscribe(
        response => {
          this.myUserInfo = response;
        }
      )
    }
    this.getSearchResults();
  }
  getSearchResults() {
    let query = this.activeRoute.snapshot.paramMap.get("tag");
    this.postService.searchByTags(query ?? "").subscribe(
      response => {
        this.searchResults = response;
      }, error => {
        this.snackBar.open("Error searching");
      }
    );
  }
}
