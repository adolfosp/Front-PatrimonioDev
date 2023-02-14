"use strict";
exports.__esModule = true;
var tipo_mensagem_enum_1 = require("@nvs-enum/tipo-mensagem.enum");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var Componente = /** @class */ (function () {
    function Componente(toaster) {
        this._toaster = toaster;
    }
    Componente.prototype.mostrarAvisoErro = function (error, mensagemInicial) {
        if (error === void 0) { error = null; }
        var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
        this._toaster[template.tipoMensagem](mensagemInicial + ". Mensagem " + template.mensagemErro, template.titulo);
    };
    Componente.prototype.mostrarAvisoXLS = function (mensagem) {
        this._toaster[tipo_mensagem_enum_1.TipoMensagem.error](mensagem, "Erro!");
    };
    Componente.prototype.mostrarAvisoSucesso = function (mensagem) {
        this._toaster.success("" + mensagem, 'Sucesso!');
    };
    return Componente;
}());
exports["default"] = Componente;
