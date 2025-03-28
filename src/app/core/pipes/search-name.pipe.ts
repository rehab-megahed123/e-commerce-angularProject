import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from '../interfaces/http';

@Pipe({
  name: 'searchName'
})
export class SearchNamePipe implements PipeTransform {

  transform(products: IProducts[], searchKey: string): IProducts[] {
    return products.filter((products)=>products.title.toLowerCase().includes(searchKey))
  }

}
