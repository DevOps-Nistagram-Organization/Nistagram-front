import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../model/LoginRequest";
import {Observable} from "rxjs";
import {LoginResponse} from "../model/LoginResponse";
import {RegistrationRequest} from "../model/RegistrationRequest";
import {RegistrationResponse} from "../model/RegistrationResponse";

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
    return this.http.post<LoginResponse>(this.path + '/login', loginRequest);
  }

  register(registrationRequest: RegistrationRequest): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(this.path + '/register', registrationRequest);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  deleteToken() {
    localStorage.removeItem("token");
  }

  getToken(): string {
    return (localStorage.getItem("token")) ?? "";
  }

  getRoles(): string {
    const jwtData = this.getToken().split('.')[1];
    if (jwtData) {
      console.log(jwtData);
      const decodedJwtJsonData = window.atob(jwtData);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);
      if (decodedJwtData.role.length > 0) {
        return decodedJwtData.role[0].authority;
      }
    }
    return '';
  }

}
