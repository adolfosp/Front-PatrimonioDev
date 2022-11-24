export class CssHelper{
    static alterarBackgroundColor(valorCor: string, elemento: HTMLElement){
        elemento.style.setProperty('background-color', valorCor);
    }
}