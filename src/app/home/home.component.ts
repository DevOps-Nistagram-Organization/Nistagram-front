import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {UserInfo} from "../model/UserInfo";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userSerivce: UserService) {
  }

  userInfo!: UserInfo;

  ngOnInit(): void {
    this.userSerivce.getMyInfo().subscribe(
      response => {
        this.userInfo = response;
      }
    )
  }

}
