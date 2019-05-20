import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';



@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(public toasterService: ToastrService,
              private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
        }
      }),
      catchError((err: any) => {
        if(err instanceof HttpErrorResponse) {
          try {
            this.toasterService.error(err.error.message, err.error.title, { positionClass: 'toast-bottom-center' });
            this.router.navigate(['project-manager/list']);
          } catch(e) {
            this.toasterService.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
            this.router.navigate(['project-manager/list']);
          }
        }
        return of(err);
      }));

  }

}
