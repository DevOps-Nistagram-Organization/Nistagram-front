import {Component, OnInit} from '@angular/core';
import {UserInfo} from "../model/UserInfo";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";
import {AuthService} from "../service/auth.service";
import {Search} from "../model/Search";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private datepipe: DatePipe,
              private authService: AuthService,
              private router: Router) {
  }

  searchResults: Array<UserInfo> = [];
  myUserInfo: UserInfo | undefined;

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
    let query = this.activeRoute.snapshot.paramMap.get("value");
    this.userService.search(new Search(query ?? "")).subscribe(
      response => {
        this.searchResults = response;
      }, error => {
        this.snackBar.open("Error searching");
      }
    )
  }
}
