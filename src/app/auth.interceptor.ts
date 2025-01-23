import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {PkceLoginService} from './authorisation/pkce-login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private pkceLoginService: PkceLoginService) {}

  // TODO: not working. now adding token manually
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.pkceLoginService.oauthService.getAccessToken();
    if (token) {
      console.log("injecting token through interceptor")
      const authRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next.handle(authRequest);
    }

    return next.handle(request);
  }
}
