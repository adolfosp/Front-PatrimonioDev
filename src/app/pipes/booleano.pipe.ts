import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleano'
})
export class BooleanoPipe implements PipeTransform {

  transform(value: boolean, descricaoAtivoInativo: boolean): string {

    if(descricaoAtivoInativo) return value ? 'Ativo': 'Inativo';

    return value ? 'Sim': 'Não';
  }
}
