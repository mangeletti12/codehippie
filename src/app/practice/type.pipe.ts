import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {

  transform(value: any, type?: any): any {
    return value.filter(x => x.type === type);
  }

}