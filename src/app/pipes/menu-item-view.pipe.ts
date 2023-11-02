import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'menuItemView'
})
export class MenuItemViewPipe implements PipeTransform {

  transform(array: any[]): any[] {
    const trimmedArr: any = []
    if (!Array.isArray(array)) {
      return [];
    };

    if (array.length <= 6) {
      console.log('array.length', array.length);
      
      return array;
    };
    
    for (let i = 0; i < 5; i++) {
      trimmedArr[i] = array[i];
    };

    return trimmedArr;
  };
};