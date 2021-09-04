import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {LoginRequest} from "../model/LoginRequest";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar, private router: Router, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }


  loginForm: FormGroup;
  hide = true;
  token: any;


  ngOnInit(): void {

  }

  get username() {
    return this.loginForm.controls.username.value as string;
  }

  get password() {
    return this.loginForm.controls.password.value as string;
  }

  onLogInSubmit() {
    const loginRequest = new LoginRequest(this.username, this.password);
    this.authService.login(loginRequest).subscribe(
      response => {
        this.authService.saveToken(response.token);
      }, error => {
        this.snackBar.open("Error logging in");
      }
    )
  }
}
