import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";
import {AuthService} from "../service/auth.service";
import {UserInfo} from "../model/UserInfo";
import {UsernameWrapper} from "../model/UsernameWrapper";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private datepipe: DatePipe,
              private authService: AuthService,
              private router: Router) {
  }

  userInfo!: UserInfo;
  followCategory = 0;
  postCategory = 0;

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.userService.getMyInfo().subscribe(
        response => {
          this.userInfo = response;
        }
      )
    }
  }

  getName(): string {
    if (this.userInfo) {
      return this.userInfo.firstName + " " + this.userInfo.lastName;
    }
    return "";
  }

  getBio(): string {
    return this.userInfo?.biography ?? "";
  }

  getUsername(): string {
    return "@" + this.userInfo?.username;
  }

  getBirthday(): string {
    if (this.userInfo?.dateOfBirth) {
      return this.datepipe.transform(this.userInfo.dateOfBirth, 'dd-MM-yyyy') ?? "";
    }
    return "";
  }

  getFollowerCategory(): Array<UserInfo> {
    if (this.userInfo) {
      if (this.followCategory === 0) {
        return this.userInfo.followers;
      }
      if (this.followCategory === 1) {
        return this.userInfo.following;
      }
      if (this.followCategory === 2) {
        return this.userInfo.sentFollowRequests;
      }
      if (this.followCategory === 3) {
        return this.userInfo.receivedFollowRequests;
      }
    }
    return [];
  }

  editProfile() {
    this.router.navigateByUrl('editProfile');
  }

  getPosts(category: number) {
    this.postCategory = category;
  }
}
