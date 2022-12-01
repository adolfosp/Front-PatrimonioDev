"use strict";
exports.__esModule = true;
exports.MensagemRequisicao = void 0;
var tipo_mensagem_enum_1 = require("@nvs-enum/tipo-mensagem.enum");
var TemplateMensagemRequisicao_1 = require("@nvs-models/TemplateMensagemRequisicao");
var MensagemRequisicao = /** @class */ (function () {
    function MensagemRequisicao() {
    }
    MensagemRequisicao.retornarMensagemTratada = function (errorMessage, mensagemServidor) {
        var errorMessageLowerCase = errorMessage.toLowerCase();
        mensagemServidor = this.validarMensagemServidor(mensagemServidor);
        var mensagemServidorLowerCase = mensagemServidor === null || mensagemServidor === void 0 ? void 0 : mensagemServidor.toLowerCase();
        switch (true) {
            case mensagemServidorLowerCase === null || mensagemServidorLowerCase === void 0 ? void 0 : mensagemServidorLowerCase.includes("a empresa de nome fantasia"):
                return new TemplateMensagemRequisicao_1.TemplateMensagemRequisicao(mensagemServidor, tipo_mensagem_enum_1.TipoMensagem.info, "Informação");
            case mensagemServidorLowerCase === null || mensagemServidorLowerCase === void 0 ? void 0 : mensagemServidorLowerCase.includes("não é possível realizar o cadastro pois o e-mail já foi utilizado em outro registro."):
                return new TemplateMensagemRequisicao_1.TemplateMensagemRequisicao(mensagemServidor, tipo_mensagem_enum_1.TipoMensagem.info, "Informação");
            case mensagemServidorLowerCase === null || mensagemServidorLowerCase === void 0 ? void 0 : mensagemServidorLowerCase.includes("a instrução delete conflitou com a restrição do reference"):
            case mensagemServidorLowerCase === null || mensagemServidorLowerCase === void 0 ? void 0 : mensagemServidorLowerCase.includes("the delete statement conflicted with the reference constraint"):
                this.mensagemPadrao = "Não é possível excluir esse registro, pois o mesmo possui relacionamento com outros registros. Detalhe: Conflito FK.";
                return new TemplateMensagemRequisicao_1.TemplateMensagemRequisicao(this.mensagemPadrao, tipo_mensagem_enum_1.TipoMensagem.info, "Informação");
            case mensagemServidorLowerCase === null || mensagemServidorLowerCase === void 0 ? void 0 : mensagemServidorLowerCase.includes("não foi encontrado usuário com as credencias informadas"):
                this.mensagemPadrao = "Não foi encontrado usuário com as credencias informadas";
                return new TemplateMensagemRequisicao_1.TemplateMensagemRequisicao(this.mensagemPadrao, tipo_mensagem_enum_1.TipoMensagem.info, "Informação");
            case mensagemServidorLowerCase === null || mensagemServidorLowerCase === void 0 ? void 0 : mensagemServidorLowerCase.includes("object reference not set to an instance of an object"):
                this.mensagemPadrao = "Erro interno no servidor. Contate o suporte. Detalhe: Referência de objeto nula.";
                return new TemplateMensagemRequisicao_1.TemplateMensagemRequisicao(this.mensagemPadrao, tipo_mensagem_enum_1.TipoMensagem.error, "Falha");
            case mensagemServidorLowerCase === null || mensagemServidorLowerCase === void 0 ? void 0 : mensagemServidorLowerCase.includes("a instrução insert conflitou com a restrição do foreign key"):
                this.mensagemPadrao = "Erro interno no servidor. Contate o suporte. Detalhe: Conflito FK.";
                return new TemplateMensagemRequisicao_1.TemplateMensagemRequisicao(this.mensagemPadrao, tipo_mensagem_enum_1.TipoMensagem.error, "Falha");
            case mensagemServidorLowerCase === null || mensagemServidorLowerCase === void 0 ? void 0 : mensagemServidorLowerCase.includes("não é possível realizar essa operação com registro padrão."):
                this.mensagemPadrao = "Não é permitido realizar qualquer operação com registro padrão do sistema.";
                return new TemplateMensagemRequisicao_1.TemplateMensagemRequisicao(this.mensagemPadrao, tipo_mensagem_enum_1.TipoMensagem.info, "Informação");
            case mensagemServidorLowerCase === null || mensagemServidorLowerCase === void 0 ? void 0 : mensagemServidorLowerCase.includes("não é possível inserir o valor null na coluna"):
                this.mensagemPadrao = "Erro interno no servidor. Contate o suporte. Detalhe: Parâmetro nulo.";
                return new TemplateMensagemRequisicao_1.TemplateMensagemRequisicao(this.mensagemPadrao, tipo_mensagem_enum_1.TipoMensagem.error, "Falha");
            case mensagemServidorLowerCase === null || mensagemServidorLowerCase === void 0 ? void 0 : mensagemServidorLowerCase.includes("não foi possível realizar a operação!"):
                return new TemplateMensagemRequisicao_1.TemplateMensagemRequisicao(mensagemServidor, tipo_mensagem_enum_1.TipoMensagem.error, "Falha");
            case errorMessageLowerCase.includes("unknown error"):
            default:
                return new TemplateMensagemRequisicao_1.TemplateMensagemRequisicao(this.mensagemPadrao, tipo_mensagem_enum_1.TipoMensagem.error, "Falha");
        }
    };
    MensagemRequisicao.validarMensagemServidor = function (mensagem) {
        if (typeof mensagem == "undefined" || mensagem == null)
            return this.mensagemPadrao;
        else
            return mensagem;
    };
    MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao = function (acao, entidade, conectivo) {
        return ("Houve um erro durante " + conectivo[0] + " " + acao + " " + conectivo[1] + " " + entidade + ".")
            .replace('atualizado', 'atualizar')
            .replace('cadastrado', 'cadastro')
            .replace('cadastrada', 'cadastro');
    };
    //TODO: VALIDAR PARA CORTAR MENSAGEM MUITO GRANDE QUE RETORNA DO SERVIDOR
    MensagemRequisicao.mensagemPadrao = "Não foi possível conectar-se ao servidor.";
    return MensagemRequisicao;
}());
exports.MensagemRequisicao = MensagemRequisicao;
