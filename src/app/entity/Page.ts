import { Pipe, PipeTransform } from '@angular/core';

class Pageable{
  offset: number;
  pageNumber: number;
  pageSize: number;

}

export class Page<E>{

  content : E[];

  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;


}

@Pipe({name: 'pages'})
export class PageCounterPipe implements PipeTransform {
  transform(page: Page<any>): string {
    if(page.totalElements == 0 ) return "";
    return "page "+(page.number + 1) + " sur " + page.totalPages + ".";

  }
}

@Pipe({name: 'elements'})
export class PageElementsPipe implements PipeTransform {
  transform(page: Page<any>): string {
    if(page.totalElements == 0 ) return "";
    return (page.number * page.size + 1) + " à " + (page.number * page.size + page.numberOfElements) + " éléments sur " + page.totalElements +"."

  }
}
