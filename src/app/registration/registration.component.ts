import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatInputModule} from '@angular/material/input';
import {RegistrationRequest} from "../model/RegistrationRequest";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar, private router: Router, private authenticationService: AuthService) {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      date: ['', [Validators.required]],
      agent: ['', [Validators.required]]

    });
  }


  registrationForm: FormGroup;
  hide = true;
  token: any;


  ngOnInit(): void {
  }

  get username() {
    return this.registrationForm.controls.username.value as string;
  }

  get password() {
    return this.registrationForm.controls.password.value as string;
  }

  get firstName() {
    return this.registrationForm.controls.firstName.value as string;
  }

  get lastName() {
    return this.registrationForm.controls.lastName.value as string;
  }

  get email() {
    return this.registrationForm.controls.email.value as string;
  }

  get gender() {
    return this.registrationForm.controls.gender.value as string;
  }

  get date() {
    return this.registrationForm.controls.date.value as string;
  }

  get agent() {
    return this.registrationForm.controls.agent.value as boolean;
  }

  onRegSubmit() {
    console.log(this.date);
    const date = new Date(this.date);
    const registrationRequest = new RegistrationRequest(this.username, this.firstName, this.lastName, this.password,
      this.email, this.gender, date, this.agent);
    this.authenticationService.register(registrationRequest).subscribe(
      response => {
        this.router.navigateByUrl('/login');
      }, error => {
        this.snackBar.open("Error registering");
      }
    )
  }

}
