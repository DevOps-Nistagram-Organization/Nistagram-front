import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {PostService} from "../service/post.service";
import {UserInfo} from "../model/UserInfo";
import {CreatePost} from "../model/CreatePost";
import {CreateCampaign} from "../model/CreateCampaign";
import {Criteria} from "../model/Criteria";
import {CampaignService} from "../service/campaign.service";

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private campaignService: CampaignService) {
    this.campaignForm = this.formBuilder.group({
      gender: ['', []],
      minAge: ['', []],
      maxAge: ['', []],
      link: ['', [Validators.required]],
      startDate: ['', []],
      endDate: ['', []],
      timeIntervals: ['', []],
      timeInterval: ['', []],
    });
  }

  get gender() {
    return this.campaignForm.controls.gender.value as string;
  }

  get minAge() {
    return this.campaignForm.controls.minAge.value as number;
  }

  get maxAge() {
    return this.campaignForm.controls.maxAge.value as number;
  }

  get link() {
    return this.campaignForm.controls.link.value as string;
  }

  get startDate() {
    return this.campaignForm.controls.startDate.value as Date;
  }

  get endDate() {
    return this.campaignForm.controls.endDate.value as Date;
  }

  get selectedTimeIntervals() {
    return this.campaignForm.controls.timeIntervals.value as Array<string>;
  }
  get selectedTimeInterval() {
    return this.campaignForm.controls.timeInterval.value as string;
  }
  campaignForm: FormGroup;
  userInfo!: UserInfo;
  selectedFile: File | undefined;
  url: any;
  single = true;

  timeIntervals = [
    "INTERVAL00",
    "INTERVAL01",
    "INTERVAL02",
    "INTERVAL03",
    "INTERVAL04",
    "INTERVAL05",
    "INTERVAL06",
    "INTERVAL07",
    "INTERVAL08",
    "INTERVAL09",
    "INTERVAL10",
    "INTERVAL11",
    "INTERVAL12",
    "INTERVAL13",
    "INTERVAL14",
    "INTERVAL15",
    "INTERVAL16",
    "INTERVAL17",
    "INTERVAL18",
    "INTERVAL19",
    "INTERVAL20",
    "INTERVAL21",
    "INTERVAL22",
    "INTERVAL23"];

  ngOnInit(): void {
  }


  post() {
    console.log(this.selectedTimeIntervals);
    let endDate: Date;
    let timeIntervals = new Array<string>();
    if(this.single) {
      endDate = this.startDate;
      timeIntervals.push(this.selectedTimeInterval);
      console.log(timeIntervals);
    } else {
      endDate = this.endDate;
      timeIntervals = this.selectedTimeIntervals
    }
    let gender = "BOTH";
    if (this.gender) {
      gender = this.gender;
    }
    let criteria = new Criteria(gender, this.minAge,this.maxAge);
    const createCampaign = new CreateCampaign(this.link,"",this.startDate, endDate, criteria, timeIntervals);
    console.log(createCampaign);
    if(this.selectedFile) {
      this.campaignService.createCampaign(createCampaign,this.selectedFile,this.success.bind(this), this.failure.bind(this));
    } else {
      this.snackBar.open("Please add image");
    }

  }

  success() {
    this.url = "";
    this.snackBar.open("Successfully added campaign");
  }

  failure() {
    this.snackBar.open("Error adding campaign");
  }

  onFileChanged(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (newEvent) => { // called once readAsDataURL is completed
        this.url = newEvent.target!.result;
      };
    }
  }

  getHourFormatted(dateInterval: string): string {
    return dateInterval.slice(-2);
  }

}
