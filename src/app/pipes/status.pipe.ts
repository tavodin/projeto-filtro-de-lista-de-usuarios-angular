import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(status: boolean): string {
    const STATUS_VALIDATION = status === null || status === undefined;
    if(STATUS_VALIDATION) {
        return "Status indisponível ou inválido";
    }
    return status ? "Ativo" : "Inativo";
  }
}
