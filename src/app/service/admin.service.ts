import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ReportAnswer} from "../model/ReportAnswer";
import {Observable} from "rxjs";
import {ReportedPost} from "../model/ReportedPost";
import {ReportPost} from "../model/ReportPost";
import {UserInfo} from "../model/UserInfo";
import {UsernameWrapper} from "../model/UsernameWrapper";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  path: string;

  constructor(private http: HttpClient) {
    this.path = `${environment.path}/api/admin/admin`
  }

  acceptReport(reportAnswer: ReportAnswer):Observable<any> {
    return this.http.post(this.path + "/acceptReport", reportAnswer);
  }

  rejectReport(reportAnswer: ReportAnswer) {
    return this.http.post(this.path + "/rejectReport", reportAnswer);
  }

  getReportedPosts(): Observable<Array<ReportedPost>> {
    return this.http.get<Array<ReportedPost>>(this.path + "/reports");
  }

  reportPost(reportPost: ReportPost): Observable<ReportedPost> {
    return this.http.post<ReportedPost>(this.path + "/reportPost", reportPost);
  }

  getNotAcceptedAgents(): Observable<Array<UserInfo>> {
    return this.http.get<Array<UserInfo>>(this.path + "/notAcceptedAgents");
  }

  acceptAgent(usernameWrapper: UsernameWrapper): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.path + "/acceptAgent", usernameWrapper);
  }

  rejectAgent(usernameWrapper: UsernameWrapper): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.path + "/rejectAgent", usernameWrapper);
  }
}
