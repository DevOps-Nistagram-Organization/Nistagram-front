import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {UserService} from "../service/user.service";
import {UserInfo} from "../model/UserInfo";

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss']
})
export class EditInfoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private userService: UserService) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      date: ['', [Validators.required]],
      bio: ['', []],
      phone: ['', []],
      publicProfile: ['', [Validators.required]],
      website: ['', []],
    });
  }


  profileForm: FormGroup;
  userInfo!: UserInfo;

  ngOnInit(): void {
    this.userService.getMyInfo().subscribe(
      response => {
        this.userInfo = response;
        this.profileForm.controls.bio.setValue(this.userInfo.biography);
        this.profileForm.controls.firstName.setValue(this.userInfo.firstName);
        this.profileForm.controls.lastName.setValue(this.userInfo.lastName);
        this.profileForm.controls.phone.setValue(this.userInfo.phone);
        this.profileForm.controls.gender.setValue(this.userInfo.gender);
        this.profileForm.controls.website.setValue(this.userInfo.website);
        this.profileForm.controls.date.setValue(this.userInfo.dateOfBirth);
        this.profileForm.controls.publicProfile.setValue('' + this.userInfo.publicProfile);
      }
    )
  }

  get bio() {
    return this.profileForm.controls.bio.value as string;
  }

  get firstName() {
    return this.profileForm.controls.firstName.value as string;
  }

  get lastName() {
    return this.profileForm.controls.lastName.value as string;
  }

  get phone() {
    return this.profileForm.controls.phone.value as string;
  }

  get gender() {
    return this.profileForm.controls.gender.value as string;
  }

  get website() {
    return this.profileForm.controls.website.value as string;
  }

  get date() {
    return this.profileForm.controls.date.value as Date;
  }

  get publicProfile() {
    return this.profileForm.controls.publicProfile.value as boolean;
  }

  editProfile() {
    this.userInfo.publicProfile = this.publicProfile;
    this.userInfo.dateOfBirth = this.date;
    this.userInfo.website = this.website;
    this.userInfo.gender = this.gender;
    this.userInfo.phone = this.phone;
    this.userInfo.lastName = this.lastName;
    this.userInfo.firstName = this.firstName;
    this.userInfo.biography = this.bio;
    this.userService.edit(this.userInfo).subscribe(
      response=> {
        this.userInfo = response;
        this.router.navigateByUrl('myProfile');
      }, error => {
        this.snackBar.open("Error editing info");
      }
    )
  }

  cancel() {
    this.router.navigateByUrl('myProfile');
  }

}
