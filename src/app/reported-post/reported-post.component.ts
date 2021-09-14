import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReportedPost} from "../model/ReportedPost";
import {Post} from "../model/Post";
import {PostService} from "../service/post.service";
import {AdminService} from "../service/admin.service";
import {ReportAnswer} from "../model/ReportAnswer";

@Component({
  selector: 'app-reported-post',
  templateUrl: './reported-post.component.html',
  styleUrls: ['./reported-post.component.scss']
})
export class ReportedPostComponent implements OnInit {

  constructor(private postService: PostService,
              private adminService: AdminService) {
  }

  @Input() reportedPost!: ReportedPost;
  post!: Post;
  @Output() postReloadEvent = new EventEmitter<number>();

  ngOnInit(): void {
    this.postService.getPost(this.reportedPost.postId).subscribe(
      response => {
        this.post = response;
      }
    );
  }

  acceptReport() {
    const reportAnswer = new ReportAnswer(this.post.id);
    this.adminService.acceptReport(reportAnswer).subscribe(
      response => {
        this.postReloadEvent.emit(this.post.id);
      }
    );
  }

  rejectReport() {
    const reportAnswer = new ReportAnswer(this.post.id);
    this.adminService.rejectReport(reportAnswer).subscribe(
      response => {
        this.postReloadEvent.emit(this.post.id);
      }
    );
  }

}
