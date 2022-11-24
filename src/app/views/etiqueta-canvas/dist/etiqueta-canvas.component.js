"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EtiquetaCanvasComponent = void 0;
var core_1 = require("@angular/core");
var CanvasImagem_1 = require("@nvs-models/CanvasImagem");
var EtiquetaCanvasComponent = /** @class */ (function () {
    function EtiquetaCanvasComponent(detectorAlteracao, toaster) {
        this.detectorAlteracao = detectorAlteracao;
        this.toaster = toaster;
        this.width = 630;
        this.height = 300;
    }
    EtiquetaCanvasComponent.prototype.ngAfterViewInit = function () {
        var canvasEl = this.canvas.nativeElement;
        this.cx = canvasEl.getContext('2d');
        canvasEl.width = this.width;
        canvasEl.height = this.height;
        this.atribuirFontes();
        this.escreverTextoNoCanvas();
        this.desenharImagemLogoPS();
        this.desenharImagemTextoPatrimonio();
        this.desenharImagemQRCode();
        this.url = "https://patrimoniops.netlify.app/#/dashboard/patrimonio?codigoPatrimonio=" + this.codigoPatrimonio + "&serviceTag=" + this.serviceTag;
        this.detectorAlteracao.detectChanges();
    };
    EtiquetaCanvasComponent.prototype.desenharImagemQRCode = function () {
        var _this = this;
        setTimeout(function () {
            var imagemQrCode = document.getElementsByTagName('img')[1];
            var imagemQr = new Image();
            imagemQr.src = imagemQrCode.getAttribute("src");
            var imagemPropriedadesQr = new CanvasImagem_1.CanvasImagem(imagemQr, 335, 50, 140, 130);
            imagemQr.onload = (function () { return _this.desenharImagem(imagemPropriedadesQr); });
        }, 700);
    };
    EtiquetaCanvasComponent.prototype.desenharImagemTextoPatrimonio = function () {
        var _this = this;
        var imagemPatrimonio = new Image();
        imagemPatrimonio.src = '../../../assets/img/patrimonio-texto.png';
        var imagemPatrimonioPropriedades = new CanvasImagem_1.CanvasImagem(imagemPatrimonio, 330, 10, 150, 20);
        imagemPatrimonio.onload = (function () { return _this.desenharImagem(imagemPatrimonioPropriedades); });
    };
    EtiquetaCanvasComponent.prototype.desenharImagemLogoPS = function () {
        var _this = this;
        var imagem = new Image();
        imagem.src = '../../../assets/img/ps.png';
        var imagemPropriedades = new CanvasImagem_1.CanvasImagem(imagem, 20, 10, 190, 150);
        imagem.onload = (function () { return _this.desenharImagem(imagemPropriedades); });
    };
    EtiquetaCanvasComponent.prototype.desenharImagem = function (canvasImage) {
        this.cx.drawImage(canvasImage.imagem, canvasImage.posicaoX, canvasImage.posicaoY, canvasImage.width, canvasImage.height);
    };
    EtiquetaCanvasComponent.prototype.downloadQrCode = function () {
        if (this.nomeFantasia == '') {
            this.toaster.toastrConfig.timeOut = 9000;
            this.toaster.info('É necessário que tenha alguma empresa com a opção de "Empresa padrão para impressão" como "SIM" para gerar a etiqueta', 'Aviso');
            return;
        }
        var linkDownload = document.getElementById("download");
        var image = this.cx.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        linkDownload.setAttribute('href', image);
    };
    EtiquetaCanvasComponent.prototype.atribuirFontes = function () {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;1,900&display=swap';
        var link1 = document.createElement('link');
        link1.rel = 'preconnect';
        link1.href = 'https://fonts.googleapis.com';
        document.getElementsByTagName('head')[0].appendChild(link);
    };
    EtiquetaCanvasComponent.prototype.escreverTextoNoCanvas = function () {
        this.cx.font = '20px "Roboto"';
        this.cx.fillText(this.nomeFantasia, 30, 200);
        this.cx.fillText("SERVICE TAG: " + this.serviceTag, 330, 210);
    };
    __decorate([
        core_1.ViewChild('canvas')
    ], EtiquetaCanvasComponent.prototype, "canvas");
    __decorate([
        core_1.Input()
    ], EtiquetaCanvasComponent.prototype, "width");
    __decorate([
        core_1.Input()
    ], EtiquetaCanvasComponent.prototype, "height");
    __decorate([
        core_1.Input('codigoPatrimonio')
    ], EtiquetaCanvasComponent.prototype, "codigoPatrimonio");
    __decorate([
        core_1.Input('serviceTag')
    ], EtiquetaCanvasComponent.prototype, "serviceTag");
    __decorate([
        core_1.Input('url')
    ], EtiquetaCanvasComponent.prototype, "url");
    __decorate([
        core_1.Input('nomeFantasia')
    ], EtiquetaCanvasComponent.prototype, "nomeFantasia");
    EtiquetaCanvasComponent = __decorate([
        core_1.Component({
            selector: 'app-canvas',
            templateUrl: './etiqueta-canvas.component.html',
            styleUrls: ['./etiqueta-canvas.component.sass']
        })
    ], EtiquetaCanvasComponent);
    return EtiquetaCanvasComponent;
}());
exports.EtiquetaCanvasComponent = EtiquetaCanvasComponent;
