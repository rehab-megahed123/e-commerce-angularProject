import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';

export const myloadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);

  spinner.show();

  return next(req).pipe(
    tap({
      next: (event: any) => {
        if (event?.status && event.status !== 200 && event.status !== 201) {
          alert('There was a problem with the response from the server.');
        }
      }
    }),
    catchError((error) => {
      alert('An error occurred while processing the request.');
      return of(error); 
    }),
    finalize(() => {
      spinner.hide();
    })
  );
};
