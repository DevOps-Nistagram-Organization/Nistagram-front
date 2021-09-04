import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  goLogin() {
    this.router.navigateByUrl('login');
  }

  goRegister() {
    this.router.navigateByUrl('register');
  }
  goHome() {
    this.router.navigateByUrl('');
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
