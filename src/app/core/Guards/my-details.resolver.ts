import { ResolveFn } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { ProductsService } from '../service/products.service';
import { inject } from '@angular/core';

export const myDetailsResolver: ResolveFn<Observable<any>> = (route, state) => {
  const id = route.paramMap.get('id');
  const product = inject(ProductsService);
  return id ? product.getDetails(id) : EMPTY;
};

