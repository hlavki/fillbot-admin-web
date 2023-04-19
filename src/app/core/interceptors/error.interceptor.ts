import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router,
    private readonly keycloakService: KeycloakService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          if (errorResponse.status === 401) {
            this.keycloakService.logout(`${window.location.origin}/home`);
          } else if (errorResponse.status === 403) {
            this.router.navigate(['/', 'system', 'forbidden']);
          } else {
            this.router.navigate(['/', 'system', 'error'])
          }
          return throwError(errorResponse);
        })
      )
  }
}
