import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CanvasImagem } from '@nvs-models/CanvasImagem';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-canvas',
  templateUrl: './etiqueta-canvas.component.html',
  styleUrls: ['./etiqueta-canvas.component.sass']
})
export class EtiquetaCanvasComponent implements AfterViewInit {

  constructor(private detectorAlteracao: ChangeDetectorRef, private toaster: ToastrService) {}

  @ViewChild('canvas') public canvas: ElementRef;

  @Input() public width = 630;
  @Input() public height = 300;

  @Input('codigoPatrimonio') codigoPatrimonio: string;
  @Input('serviceTag') serviceTag: string;
  @Input('url') url: string;
  @Input('nomeFantasia') nomeFantasia: string;

  private cx: CanvasRenderingContext2D;

  public ngAfterViewInit() {

    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;

    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.atribuirFontes();

    this.escreverTextoNoCanvas()

    this.desenharImagemLogoPS()

    this.desenharImagemTextoPatrimonio();

    this.desenharImagemQRCode();

    this.url = `https://patrimoniops.netlify.app/#/dashboard/patrimonio?codigoPatrimonio=${this.codigoPatrimonio}&serviceTag=${this.serviceTag}`
    this.detectorAlteracao.detectChanges();

  }

  private desenharImagemQRCode(): void {
    setTimeout(() => {
      const imagemQrCode = document.getElementsByTagName('img')[1];
      const imagemQr = new Image();
      imagemQr.src = imagemQrCode.getAttribute("src");
      const imagemPropriedadesQr = new CanvasImagem(imagemQr, 335, 50, 140, 130);
      imagemQr.onload= (() => this.desenharImagem(imagemPropriedadesQr))

    }, 700);
  }

  private desenharImagemTextoPatrimonio(): void {
    const imagemPatrimonio = new Image();
    imagemPatrimonio.src = '../../../assets/img/patrimonio-texto.png'
    const imagemPatrimonioPropriedades = new CanvasImagem(imagemPatrimonio,330,10,150,20);
    imagemPatrimonio.onload= (() => this.desenharImagem(imagemPatrimonioPropriedades));
  }

  private desenharImagemLogoPS(): void {
    const imagem = new Image();
    imagem.src = '../../../assets/img/ps.png'
    const imagemPropriedades = new CanvasImagem(imagem, 20, 10, 190, 150);
    imagem.onload= (() => this.desenharImagem(imagemPropriedades))
  }


  private desenharImagem(canvasImage: CanvasImagem): void {
    this.cx.drawImage(canvasImage.imagem, canvasImage.posicaoX, canvasImage.posicaoY, canvasImage.width, canvasImage.height);
  }

  public downloadQrCode(): void{
    if(this.nomeFantasia == ''){
      this.toaster.toastrConfig.timeOut = 9000;
      this.toaster.info('É necessário que tenha alguma empresa com a opção de "Empresa padrão para impressão" como "SIM" para gerar a etiqueta','Aviso')
      return;
    }


    const linkDownload = document.getElementById("download");
    const image = this.cx.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    linkDownload.setAttribute('href',image)
  }

  private atribuirFontes(): void {
    const link = document.createElement("link");
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;1,900&display=swap';

    const link1 = document.createElement("link");
    link1.rel = 'preconnect';
    link1.href = 'https://fonts.googleapis.com';

    document.getElementsByTagName('head')[0].appendChild(link);
  }

  private escreverTextoNoCanvas(): void {
    this.cx.font = '20px "Roboto"';
    this.cx.fillText(this.nomeFantasia, 30, 200);
    this.cx.fillText(`SERVICE TAG: ${this.serviceTag}`, 330,210);
  }
}




