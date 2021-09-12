import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {UserInfo} from "../model/UserInfo";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userSerivce: UserService, private router: Router) {
  }

  userInfo!: UserInfo;

  ngOnInit(): void {
    this.userSerivce.getMyInfo().subscribe(
      response => {
        this.userInfo = response;
      }
    )
  }

  createCampaign() {
    this.router.navigateByUrl('createCampaign');
  }

}
