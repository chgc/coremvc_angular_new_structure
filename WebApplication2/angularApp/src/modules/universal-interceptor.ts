import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { ORIGIN_URL } from '@nguniversal/aspnetcore-engine';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {
  constructor(
    @Optional()
    @Inject(ORIGIN_URL)
    private serverUrl
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(this.serverUrl);
    const serverReq = !this.serverUrl
      ? req
      : req.clone({
          url: `${this.serverUrl}${req.url}`
        });

    return next.handle(serverReq);
  }
}
