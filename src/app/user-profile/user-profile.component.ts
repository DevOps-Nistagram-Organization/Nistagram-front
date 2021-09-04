import {Component, OnInit} from '@angular/core';
import {UserInfo} from "../model/UserInfo";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private datepipe: DatePipe) {
  }

  userInfo: UserInfo | undefined;
  username: string | null = "";
  myUserInfo: UserInfo | undefined;

  ngOnInit(): void {
    this.username = this.activeRoute.snapshot.paramMap.get("username");
    this.userService.getUserInfo(this.username!).subscribe(
      response => {
        this.userInfo = response;
      }, error => {
        this.snackBar.open("Error getting user info");
      }
    )
    this.userService.getMyInfo().subscribe(
      response => {
        this.myUserInfo = response;
      }
    )
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
    if(this.userInfo?.dateOfBirth) {
      return this.datepipe.transform(this.userInfo.dateOfBirth, 'dd-MM-yyyy') ?? "";
    }
    return "";
  }
}
