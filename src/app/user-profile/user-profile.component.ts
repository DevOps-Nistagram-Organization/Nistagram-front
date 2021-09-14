import {Component, OnInit} from '@angular/core';
import {UserInfo} from "../model/UserInfo";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";
import {AuthService} from "../service/auth.service";
import {UsernameWrapper} from "../model/UsernameWrapper";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private datepipe: DatePipe,
              private authService: AuthService,
              private router: Router) {
  }

  userInfo: UserInfo | undefined;
  username: string | null = "";
  myUserInfo: UserInfo | undefined;

  ngOnInit(): void {
    this.username = this.activeRoute.snapshot.paramMap.get("username");
    this.userService.getUserInfo(this.username!).subscribe(
      response => {
        console.log(response);
        this.userInfo = response;
      }, error => {
        this.snackBar.open("Error getting user info");
      }
    )
    if (this.authService.isLoggedIn()) {
      this.userService.getMyInfo().subscribe(
        response => {
          this.myUserInfo = response;
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
    return "@" + this.username;
  }

  getPublicProfile(): boolean {
    if (!this.myUserInfo) {
      return this.userInfo?.publicProfile ?? false;
    } else {
      const myUsername = this.myUserInfo.username;
      const followers = this.userInfo?.followers ?? [];
      const exist = followers.find(value => value.username === myUsername);
      if (exist) {
        return true;
      }
      return false;
    }
  }

  getBirthday(): string {
    if (this.userInfo?.dateOfBirth) {
      return this.datepipe.transform(this.userInfo.dateOfBirth, 'dd-MM-yyyy') ?? "";
    }
    return "";
  }

  canFollow(): boolean {
    if (this.authService.isLoggedIn() && this.myUserInfo) {
      if (this.userInfo?.publicProfile) {
        if (!this.myUserInfo.following.find(value => value.username === this.username)) {
          return true;
        }
      }
    }
    return false;
  }

  canUnfollow(): boolean {
    if (this.authService.isLoggedIn() && this.myUserInfo) {
      if (this.myUserInfo.following.find(value => value.username === this.username)) {
        return true;
      }
    }
    return false;
  }

  canRequestFollow(): boolean {
    if (this.authService.isLoggedIn() && this.myUserInfo) {
      if (!this.userInfo?.publicProfile) {
        if ((!this.myUserInfo.following.find(value => value.username === this.username) &&
          !this.myUserInfo?.sentFollowRequests.find(value => value.username === this.username))) {
          return true;
        }
      }
    }
    return false;
  }

  canRevokeRequest(): boolean {
    if (this.myUserInfo?.sentFollowRequests.find(value => value.username === this.username)) {
      return true;
    }
    return false;
  }

  follow() {
    this.userService.follow(new UsernameWrapper(this.username ?? "")).subscribe(
      response => {
        this.myUserInfo = response;
      }
    );
  }

  unfollow() {
    this.userService.unfollow(new UsernameWrapper(this.username ?? "")).subscribe(
      response => {
        this.myUserInfo = response;
      }
    );
  }

  requestFollow() {
    this.userService.sendFollowRequest(new UsernameWrapper(this.username ?? "")).subscribe(
      response => {
        this.myUserInfo = response;
      }
    );
  }

  revokeRequest() {
    this.userService.removeFollowRequest(new UsernameWrapper(this.username ?? "")).subscribe(
      response => {
        this.myUserInfo = response;
      }
    );
  }

  canMute() {
    if (this.userInfo) {
      if (this.userInfo.following.find(value => value.username === this.username ?? "") && !this.userInfo.mutedUsers.find(value => value.username === this.username ?? "")) {
        return true;
      }
    }
    return false;
  }

  mute() {
    this.userService.mute(new UsernameWrapper(this.username ?? "")).subscribe(
      response => {
        this.userInfo = response;
      }
    );
  }

  canUnMute() {
    if (this.userInfo) {
      if (this.userInfo.following.find(value => value.username === this.username ?? "") && this.userInfo.mutedUsers.find(value => value.username === this.username ?? "")) {
        return true;
      }
    }
    return false;
  }

  unmute() {
    this.userService.unmute(new UsernameWrapper(this.username ?? "")).subscribe(
      response => {
        this.snackBar.open("Unmuted user")
        this.userInfo = response;
      }
    );
  }

  canBlock() {
    if (this.userInfo) {
      return true;
    }
    return false;
  }

  blockUser() {
    this.userService.block(new UsernameWrapper(this.username ?? "")).subscribe(
      response => {
        this.snackBar.open("Blocked user")
        this.userInfo = response;
        this.router.navigateByUrl('');
      }
    );
  }
}
