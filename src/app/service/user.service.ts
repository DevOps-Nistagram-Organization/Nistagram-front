import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {UserInfo} from "../model/UserInfo";
import {UsernameWrapper} from "../model/UsernameWrapper";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  path: string;

  constructor(private http: HttpClient) {
    this.path = `${environment.path}/user-service/user`
  }

  getUserInfo(username: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.path + '/getUser/' + username);
  }

  getMyInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.path + '/getMyInfo');
  }

  follow(usernameWrapper: UsernameWrapper): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.path + '/follow', usernameWrapper);
  }
  unfollow(usernameWrapper: UsernameWrapper): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.path + '/unfollow', usernameWrapper);
  }
  sendFollowRequest(usernameWrapper: UsernameWrapper): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.path + '/send-follow-request', usernameWrapper);
  }
  removeFollowRequest(usernameWrapper: UsernameWrapper): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.path + '/remove-follow-request', usernameWrapper);
  }

  acceptFollowRequest(usernameWrapper: UsernameWrapper): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.path + '/accept-follow-request', usernameWrapper);
  }
  rejectFollowRequest(usernameWrapper: UsernameWrapper): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.path + '/reject-follow-request', usernameWrapper);
  }
}
