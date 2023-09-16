import { Pipe, PipeTransform } from '@angular/core';
import { userData } from '../sign-in/userData';

@Pipe({
  name: 'sortPipe',
  pure: true
})
export class SortPipe implements PipeTransform {


  transform(array: userData[], args?: any): any {
    return array.slice().sort((a: any, b: any) => b - a);
  }


}
