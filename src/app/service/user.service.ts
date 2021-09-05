import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {UserInfo} from "../model/UserInfo";

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
}
