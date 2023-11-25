import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'applyConditionClass'
})
export class ApplyConditionClassPipe implements PipeTransform {

  transform(conditionFn: any, element: any): string {
    console.log('conditionFn', element);
    if (!conditionFn) {
      // Retornar una clase predeterminada o nada si no hay función
      return '';
    }
    // Ejecutar la función pasada y devolver su resultado
    return conditionFn(element);
  }

}
