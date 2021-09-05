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

  userInfo: UserInfo | undefined;
  followCategory = 0;

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

  isFollowed(username: string): boolean {
    if (this.userInfo) {
      if (this.userInfo.followers.find(value => value.username === username)) {
        return true;
      }
    }
    return false;
  }

  isFollowing(username: string): boolean {
    if (this.userInfo) {
      if (this.userInfo.following.find(value => value.username === username)) {
        return true;
      }
    }
    return false;
  }

  sentRequest(username: string): boolean {
    if (this.userInfo) {
      if (this.userInfo.sentFollowRequests.find(value => value.username === username)) {
        return true;
      }
    }
    return false;
  }

  receivedRequest(username: string): boolean {
    if (this.userInfo) {
      if (this.userInfo.receivedFollowRequests.find(value => value.username === username)) {
        return true;
      }
    }
    return false;
  }

  unfollow(username: string) {
    this.userService.unfollow(new UsernameWrapper(username)).subscribe(
      response => {
        this.userInfo = response;
      }
    );
  }

  revokeRequest(username: string) {
    this.userService.removeFollowRequest(new UsernameWrapper(username)).subscribe(
      response => {
        this.userInfo = response;
      }
    );
  }

  acceptRequest(username: string) {
    this.userService.acceptFollowRequest(new UsernameWrapper(username)).subscribe(
      response => {
        this.userInfo = response;
      }
    );
  }

  rejectRequest(username: string) {
    this.userService.rejectFollowRequest(new UsernameWrapper(username)).subscribe(
      response => {
        this.userInfo = response;
      }
    );
  }

  viewProfile(username: string) {
    this.router.navigateByUrl('user/' + username);
  }

}
