import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {PostService} from "../service/post.service";
import {Post} from "../model/Post";
import {UserInfo} from "../model/UserInfo";
import {PostIdWrapper} from "../model/PostIdWrapper";
import {Campaign} from "../model/Campaign";
import {CampaignService} from "../service/campaign.service";

@Component({
  selector: 'app-campaign-post',
  templateUrl: './campaign-post.component.html',
  styleUrls: ['./campaign-post.component.scss']
})
export class CampaignPostComponent implements OnInit {

  constructor(private authService: AuthService,
              private postService: PostService,
              private campaignService: CampaignService) {
  }

  @Input() campaign!: Campaign;
  post!: Post;
  @Input() userInfo!: UserInfo;

  ngOnInit(): void {
    console.log('on init');
    this.postService.getPost(this.campaign.postId).subscribe(
      response => {
        console.log("Camppost")
        this.post = response;
      }
    );
  }


}
