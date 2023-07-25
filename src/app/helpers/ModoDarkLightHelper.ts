import { LocalStorageChave } from "@nvs-models/enums/local-storage-chave.enum";
import { LocalStorageService } from "@nvs-services/local-storage/local-storage.service";

//Exportável
function atribuirDataTheme(modoNovo: string, modoAnterior: string){

  let localStorageService = new LocalStorageService();

  localStorageService.adicionarChave(LocalStorageChave.DarkMode, modoNovo);
  document.documentElement.setAttribute('data-theme', modoNovo);
  document.body.classList.add(`${modoNovo}`);
  document.body.classList.remove(`${modoAnterior}`);
}

function mudarTema(e: any): void {

  let modoNovo = e.target.checked ? 'dark' : 'light';
  let modoAnterior = modoNovo == 'dark' ? 'light' : 'dark';

  atribuirDataTheme(modoNovo, modoAnterior);

  if (modoNovo == 'dark') {
    atribuirVariaveisModoDark();
    return;
  }

  atribuirVariaveisModoLight();

}

function atribuirModoDarkLightPadrao(): void {

  let localStorageService = new LocalStorageService();
  const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');

  if (prefersColorScheme.matches) {
    localStorageService.adicionarChave(LocalStorageChave.DarkMode, 'dark')
    //TODO: PENSAR FORMA MELHOR DE PASSAR O PARÂMETRO
    mudarTema({ target: { checked: true } });

  } else {
    localStorageService.adicionarChave(LocalStorageChave.DarkMode, 'light')
    mudarTema({ target: { checked: false } });
  }

}

function atribuirTemaCorretoAoRecarregarPagina(): void {
  let localStorageService = new LocalStorageService();

  if(localStorageService.obterChave(LocalStorageChave.DarkMode) == 'dark'){
    mudarTema({target: {checked:true}})
  }

}

// Não exportável
function atribuirBackgroundColorNosCard(corParaAtribuir: string): void{
  let cards =  document.getElementsByClassName('card')[0] as HTMLElement;
  if(typeof cards == 'undefined') return;

  cards.style.setProperty('background-color', corParaAtribuir);
}

function atribuirVariaveisModoLight(){
  document.documentElement.style.setProperty('--color-black', 'black');
  document.documentElement.style.setProperty('--color-background', '#E4E5E6');
  document.documentElement.style.setProperty('--color-contraste', 'black');
  document.documentElement.style.setProperty('--color-background-breadcrumb', '#fff');
  document.documentElement.style.setProperty('--color-background-menu-superior', '#fff');
  document.documentElement.style.setProperty('--color-pagination', 'gray');

  atribuirBackgroundColorNosCard('white');
}

function atribuirVariaveisModoDark(){
  document.documentElement.style.setProperty('--color-black', 'black');
  document.documentElement.style.setProperty('--color-background', '#262A2E');
  document.documentElement.style.setProperty('--color-contraste', 'white');
  document.documentElement.style.setProperty('--color-background-breadcrumb', '#3A4248');
  document.documentElement.style.setProperty('--color-background-menu-superior', '#262A2E');
  document.documentElement.style.setProperty('--color-pagination', 'white');

  atribuirBackgroundColorNosCard('whitesmoke');
}

export {
  atribuirDataTheme,
  atribuirModoDarkLightPadrao,
  mudarTema,
  atribuirTemaCorretoAoRecarregarPagina
};

