import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {UserInfo} from "../model/UserInfo";
import {UsernameWrapper} from "../model/UsernameWrapper";
import {Search} from "../model/Search";
import {ImageService} from "./image.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  path: string;

  constructor(private http: HttpClient, private imageService: ImageService) {
    this.path = `${environment.path}/api/user/user`
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

  search(searchDTO: Search): Observable<Array<UserInfo>> {
    return this.http.post<Array<UserInfo>>(this.path + '/search', searchDTO);
  }

  edit(userInfo: UserInfo, file: File | undefined, success: Function, failure: Function){
    if (!file) {
      this.http.put<UserInfo>(this.path + '/edit', userInfo).subscribe(
        response => {
          success();
        }, error => {
          failure();
        }
      );
    } else {
      this.imageService.uploadImage(file).subscribe(
        response => {
          userInfo.imagePath = response.url;
          return this.http.put<UserInfo>(this.path + '/edit', userInfo).subscribe(
            response => {
              success();
            }, error => {
              failure();
            }
          )
        }
      );
    }
  }

  mute(username: UsernameWrapper): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.path + '/mute', username);

  }

  unmute(username: UsernameWrapper): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.path + '/unmute', username);

  }

  block(username: UsernameWrapper): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.path + '/block', username);
  }
}
