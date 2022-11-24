import { Injectable } from '@angular/core';
import { LocalStorageChave } from '@nvs-enum/local-storage-chave.enum';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public adicionarChave(indexChave: LocalStorageChave, valor: string){
    localStorage.setItem(LocalStorageChave[indexChave], valor);
  }

  public removerChave(indexChave: LocalStorageChave){
    localStorage.removeItem(LocalStorageChave[indexChave]);
  }

  public obterChave(indexChave: LocalStorageChave): string{
    return this.tratarValorLocalStorage(localStorage.getItem(LocalStorageChave[indexChave]) || '');
  }

  private tratarValorLocalStorage(valor: string): string{

    if(typeof valor == 'undefined'){
      return '';
    }

    return valor;
  }
}
