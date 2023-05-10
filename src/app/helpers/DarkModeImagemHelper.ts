import { LocalStorageChave } from '@nvs-models/enums/local-storage-chave.enum';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

export class DarkModeImagemHelper {

  constructor(caminhoImagemDark: string, caminhoImagemLight: string, idCampoImagem: string) {
    this.caminhoImagemDark = caminhoImagemDark;
    this.caminhoImagemLight = caminhoImagemLight;
    this.idCampoImagem = idCampoImagem;
  }

  caminhoImagemDark: string;
  caminhoImagemLight: string;
  idCampoImagem: string;

  public alternarImagemDeAcordoComOModo(): void {

    let localStorageService = new LocalStorageService();

    let darkMode = localStorageService.obterChave(LocalStorageChave.DarkMode)

    this.definirImagemDeAcordoComOModo(darkMode)
  }

  private definirImagemDeAcordoComOModo(darkMode: string): void {

    let imagemNovoRegistro = document.getElementById(this.idCampoImagem);
    if (darkMode == 'dark') {
      imagemNovoRegistro?.setAttribute('src', this.caminhoImagemDark);
    } else {
      imagemNovoRegistro?.setAttribute('src', this.caminhoImagemLight);
    }

  }
}
