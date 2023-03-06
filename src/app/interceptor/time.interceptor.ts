import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';


const mustCheckTime = new HttpContextToken<boolean>(() => false);

export function checkTime() {
  return new HttpContext().set(mustCheckTime, true);
}

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  //constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(mustCheckTime)){
      const start = performance.now();
      return next.handle(request).pipe(
        tap(() => {
          const end = performance.now();
          console.log(`Request for ${request.urlWithParams} took ${end - start} ms.`);
        })
      );
    } else {
      return next.handle(request);
    }

  }



}
