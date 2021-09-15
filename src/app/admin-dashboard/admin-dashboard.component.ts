import {Component, OnInit} from '@angular/core';
import {AdminService} from "../service/admin.service";
import {ReportedPost} from "../model/ReportedPost";
import {UserInfo} from "../model/UserInfo";
import {UsernameWrapper} from "../model/UsernameWrapper";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private adminService: AdminService,
              private snackBar: MatSnackBar) {
  }

  reportedPosts = Array<ReportedPost>();
  agents = Array<UserInfo>();

  ngOnInit(): void {
    this.getReportedPosts();
    this.getAgents();
  }

  getReportedPosts() {
    this.adminService.getReportedPosts().subscribe(
      response => {
        this.reportedPosts = response
      }
    );
  }

  getAgents() {
    this.adminService.getNotAcceptedAgents().subscribe(
      response => {
        this.agents = response;
      }
    );
  }

  acceptAgent(username: string) {
    const usernameWrapper = new UsernameWrapper(username);
    this.adminService.acceptAgent(usernameWrapper).subscribe(
      response => {
        this.snackBar.open("Accepted agent");
        this.getAgents();
      }, error => {
        this.snackBar.open("Error accepting agent");
      }
    );
  }

  rejectAgent(username: string) {
    const usernameWrapper = new UsernameWrapper(username);
    this.adminService.rejectAgent(usernameWrapper).subscribe(
      response => {
        this.snackBar.open("Rejected agent");
        this.getAgents();
      }, error => {
        this.snackBar.open("Error rejecting agent");
      }
    );
  }

  reloadPosts() {
    this.getReportedPosts();
  }
}
