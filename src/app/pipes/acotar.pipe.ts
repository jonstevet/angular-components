import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'acotar'
})
export class AcotarPipe implements PipeTransform {

  transform(value: string): string {
    return value.split('').slice(0, 18).join('');
  }
}
