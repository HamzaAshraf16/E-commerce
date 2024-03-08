import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buy'
})
export class BuyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
