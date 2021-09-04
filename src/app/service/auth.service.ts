import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../model/LoginRequest";
import {Observable} from "rxjs";
import {LoginResponse} from "../model/LoginResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  path: string;

  constructor(private http: HttpClient) {
    this.path = `${environment.path}/auth-service`
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.path+'/login',loginRequest);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  deleteToken() {
    localStorage.removeItem("token");
  }
}
