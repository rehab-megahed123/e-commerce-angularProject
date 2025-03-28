import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, tap } from 'rxjs';

export const myloadingInterceptor: HttpInterceptorFn = (req, next) => {
const spiner=inject(NgxSpinnerService)
spiner.show()
  return next(req).pipe(finalize(()=>{
spiner.hide()
  }), tap((event)=>{
if(event.type==HttpEventType.Response){
if(event.status!==200){
alert('Try Again Later')
}
}
  }))
};
