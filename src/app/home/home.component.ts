import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {UserInfo} from "../model/UserInfo";
import {Router} from "@angular/router";
import {CampaignService} from "../service/campaign.service";
import {Campaign} from "../model/Campaign";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userSerivce: UserService,
              private router: Router,
              private campaignService: CampaignService) {
  }

  userInfo!: UserInfo;
  campaigns = Array<Campaign>();

  ngOnInit(): void {
    this.userSerivce.getMyInfo().subscribe(
      response => {
        this.userInfo = response;
      }
    );
    this.getCampaigns();
  }

  createCampaign() {
    this.router.navigateByUrl('createCampaign');
  }

  getCampaigns() {
    this.campaignService.getCampaigns().subscribe(
      response => {
        this.campaigns = response;
        console.log(this.campaigns)
      }
    );
  }

  isAgent() {
    if(this.userInfo) {
      return this.userInfo.agent;
    }
    return false;
  }
}
