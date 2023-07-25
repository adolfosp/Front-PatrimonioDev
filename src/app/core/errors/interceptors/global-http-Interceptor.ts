import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {
  constructor(public router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = "invald token";
    req = req.clone({ headers: req.headers.set("Authorization", "Bearer " + token) });

    return next.handle(req).pipe(
      // eslint-disable-next-line rxjs/no-implicit-any-catch
      catchError((error: any) => {
        let handled = false;
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error("Error Event");
          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 401:
                this.router.navigateByUrl("/login");
                handled = true;
                break;
              case 403:
                this.router.navigateByUrl("/login");
                handled = true;
                break;
            }
          }
        }

        if (handled) {
          return of(error);
        } else {
          return throwError(() => error);
        }
      }),
    );
  }
}
