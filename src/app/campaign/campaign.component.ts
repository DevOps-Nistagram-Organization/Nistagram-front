import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserInfo} from "../model/UserInfo";
import {Campaign} from "../model/Campaign";
import {CampaignService} from "../service/campaign.service";

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  constructor(private campaignService: CampaignService) {
  }

  ngOnInit(): void {
  }

  @Input() campaign!: Campaign;
  @Output() deleteCampaignEvent = new EventEmitter<Boolean>();
  formatInterval(interval: string) {
    return interval.slice(-2);
  }

  deleteCampaign() {
    this.campaignService.deleteCampaign(this.campaign.id).subscribe(
      response => {
        this.deleteCampaignEvent.emit(true);
      }
    );
  }
}
