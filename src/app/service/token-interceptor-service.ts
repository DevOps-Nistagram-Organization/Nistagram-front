import {Injectable} from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {HttpRequest} from '@angular/common/http';
import {HttpHandler} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpEvent} from '@angular/common/http';
import {Injector} from '@angular/core';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private inj: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('cloudinary')) {
      request = request.clone();
      return next.handle(request);
    }
    const token = this.getToken();
    if (token !== "") {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.getToken()}`
        }
      });
    } else {
      request = request.clone();
    }


    return next.handle(request);
  }

  getToken(): string {
    return localStorage.getItem('token') ?? "";
  }


}
