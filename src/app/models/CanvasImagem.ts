export class CanvasImagem {

    constructor(imagem: HTMLImageElement, posicaoX: number, posicaoY: number, width: number, height: number) {
      this.imagem = imagem;
      this.height = height;
      this.width = width;
      this.posicaoX = posicaoX;
      this.posicaoY = posicaoY
  
    }
    imagem: HTMLImageElement;
    posicaoX: number;
    posicaoY: number;
    width: number;
    height: number;
  } 