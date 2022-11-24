"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PerfilComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var ValidacaoSenhaHelper_1 = require("@nvs-helpers/ValidacaoSenhaHelper");
var environment_1 = require("../../../../environments/environment");
var PerfilComponent = /** @class */ (function () {
    function PerfilComponent(perfilService, token, toaster, fb, spinner) {
        this.perfilService = perfilService;
        this.token = token;
        this.toaster = toaster;
        this.fb = fb;
        this.spinner = spinner;
        this.usuarioPerfil = {};
        this.imagemUrl = "assets/img/sem-imagem.png";
    }
    Object.defineProperty(PerfilComponent.prototype, "f", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    PerfilComponent.prototype.cssValidator = function (campoForm) {
        return { "is-invalid": campoForm.errors && campoForm.touched };
    };
    PerfilComponent.prototype.ngOnInit = function () {
        this.codigoUsuario = this.token.obterCodigoUsuarioToken();
        this.validacao();
        this.carregarPerfilUsuario();
        this.tratarRetornoRequisicaoImagem();
    };
    PerfilComponent.prototype.tratarRetornoRequisicaoImagem = function () {
        var _this = this;
        window.addEventListener("error", function (error) {
            var nodeName = error.target.nodeName;
            if (nodeName.includes("IMG")) {
                _this.atribuirCaminhoImagemPadraoPerfil();
            }
        }, true);
    };
    PerfilComponent.prototype.validacao = function () {
        var formOptions = {
            validators: ValidacaoSenhaHelper_1.ValidacaoCampoSenha.MustMatch("senha", "confirmeSenha")
        };
        this.form = this.fb.group({
            codigoUsuario: new forms_1.FormControl(null),
            nomeUsuario: new forms_1.FormControl(""),
            nomeSetor: new forms_1.FormControl(null),
            razaoSocial: new forms_1.FormControl(null),
            descricaoPermissao: new forms_1.FormControl(null),
            email: new forms_1.FormControl(null),
            senha: new forms_1.FormControl("", [
                forms_1.Validators.required,
                forms_1.Validators.minLength(5),
                forms_1.Validators.maxLength(25),
            ]),
            imagemUrl: new forms_1.FormControl(""),
            confirmeSenha: new forms_1.FormControl("", [
                forms_1.Validators.required,
                forms_1.Validators.minLength(5),
                forms_1.Validators.maxLength(25),
            ])
        }, formOptions);
    };
    PerfilComponent.prototype.carregarPerfilUsuario = function () {
        var _this = this;
        this.spinner.show("carregando");
        this.perfilService
            .obterPerfilUsuario(this.codigoUsuario)
            .subscribe(function (result) {
            _this.form.patchValue(result);
            _this.nomeUsuario = result.nomeUsuario;
            _this.codigoUsuario = result.codigoUsuario;
            _this.form.controls["confirmeSenha"].setValue(result.senha);
            debugger;
            _this.tratarUrlImagem(result.imagemUrl);
        }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem]("Houve um erro ao carregar o perfil. Mensagem: " + template.mensagemErro, "Erro");
        })
            .add(function () { return _this.spinner.hide("carregando"); });
    };
    PerfilComponent.prototype.tratarUrlImagem = function (url) {
        debugger;
        if (typeof url == "undefined" || url == null)
            this.atribuirCaminhoImagemPadraoPerfil();
        else
            this.imagemUrl = environment_1.environment.apiUrlImage + "/" + url;
    };
    PerfilComponent.prototype.salvarAlteracaoPerfil = function () {
        var _this = this;
        this.spinner.show("atualizando");
        this.usuarioPerfil.senha = this.form.controls["senha"].value;
        this.usuarioPerfil.nomeUsuario = this.nomeUsuario;
        this.usuarioPerfil.codigoUsuario = this.form.controls["codigoUsuario"].value;
        this.perfilService
            .atualizarPerfilUsuario(this.usuarioPerfil)
            .subscribe(function () {
            _this.toaster.success("Perfil atualizado com sucesso!");
        }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem]("Houve um erro ao atualizar o perfil. Mensagem: " + template.mensagemErro, "Erro");
        })
            .add(function () { return _this.spinner.hide("atualizando"); });
    };
    PerfilComponent.prototype.onFileChange = function (env) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (event) { return (_this.imagemUrl = event.target.result); };
        this.file = env.target.files;
        reader.readAsDataURL(this.file[0]);
        this.uploadImagem();
    };
    PerfilComponent.prototype.handleMissingImage = function (event) {
        debugger;
        event.target.style.display = "none";
    };
    PerfilComponent.prototype.uploadImagem = function () {
        var _this = this;
        this.spinner.show("upload");
        this.perfilService
            .inserirImagem(this.codigoUsuario, this.file[0])
            .subscribe(function () {
            _this.carregarPerfilUsuario();
            _this.toaster.success("Imagem atualizada com sucesso", "Sucesso");
        }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem]("Houve um erro ao subir a imagem: Mensagem: " + template.mensagemErro, "Erro");
        })
            .add(function () { return _this.spinner.hide("upload"); });
    };
    PerfilComponent.prototype.atribuirCaminhoImagemPadraoPerfil = function () {
        this.imagemUrl = "assets/img/sem-imagem.png";
    };
    PerfilComponent = __decorate([
        core_1.Component({
            selector: "app-perfil",
            templateUrl: "./perfil.component.html",
            styleUrls: ["./perfil.component.sass"]
        })
    ], PerfilComponent);
    return PerfilComponent;
}());
exports.PerfilComponent = PerfilComponent;