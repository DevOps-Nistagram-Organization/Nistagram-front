import {Component, Input, OnInit} from '@angular/core';
import {UsernameWrapper} from "../model/UsernameWrapper";
import {UserInfo} from "../model/UserInfo";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-user-preview-row',
  templateUrl: './user-preview-row.component.html',
  styleUrls: ['./user-preview-row.component.scss']
})
export class UserPreviewRowComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private datepipe: DatePipe,
              private authService: AuthService,
              private router: Router) {
  }

  @Input() userInfo: UserInfo | undefined;
  @Input() otherUserInfo: UserInfo | undefined;

  ngOnInit(): void {
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


  canFollow(otherUserInfo: UserInfo): boolean {
    if (this.authService.isLoggedIn() && this.userInfo) {
      if (this.otherUserInfo?.publicProfile) {
        if (!this.userInfo.following.find(value => value.username === otherUserInfo.username)) {
          return true;
        }
      }
    }
    return false;
  }

  canUnfollow(username: string): boolean {
    if (this.authService.isLoggedIn() && this.userInfo) {
      if (this.userInfo.following.find(value => value.username === username)) {
        return true;
      }
    }
    return false;
  }

  canRequestFollow(otherUserInfo: UserInfo): boolean {
    if (this.authService.isLoggedIn() && this.userInfo) {
      if (!this.otherUserInfo?.publicProfile) {
        if ((!this.userInfo.following.find(value => value.username === otherUserInfo.username) &&
          !this.userInfo?.sentFollowRequests.find(value => value.username === otherUserInfo.username))) {
          return true;
        }
      }
    }
    return false;
  }

  canRevokeRequest(username: string): boolean {
    if (this.userInfo?.sentFollowRequests.find(value => value.username === username)) {
      return true;
    }
    return false;
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

  follow(username: string) {
    this.userService.follow(new UsernameWrapper(username)).subscribe(
      response=> {
        this.userInfo = response;
      }
    );
  }

  requestFollow(username: string) {
    this.userService.sendFollowRequest(new UsernameWrapper(username)).subscribe(
      response=> {
        this.userInfo = response;
      }
    );
  }
}
