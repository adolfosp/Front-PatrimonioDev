"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PermissaoComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var PermissaoComponent = /** @class */ (function () {
    function PermissaoComponent(fb, spinner, toaster, router, permissaoService, activateRouter) {
        this.fb = fb;
        this.spinner = spinner;
        this.toaster = toaster;
        this.router = router;
        this.permissaoService = permissaoService;
        this.activateRouter = activateRouter;
        this.usuarioPermissao = {};
        this.estadoSalvar = 'cadastrarPermissao';
        this.limpandoCampo = false;
        //TODO: Realizar busca do banco
        this.permissoesPorContexto = [
            { nomeContexto: 'Patrimônio', codigo: 1, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
            { nomeContexto: 'Setor', codigo: 2, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
            { nomeContexto: 'Empresa', codigo: 3, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
            { nomeContexto: 'Equipamento', codigo: 4, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
            { nomeContexto: 'Permissão', codigo: 5, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
            { nomeContexto: 'Fabricante', codigo: 6, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
            { nomeContexto: 'Funcionário', codigo: 7, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
            { nomeContexto: 'Movimentação', codigo: 8, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
            { nomeContexto: 'CategoriaEquipamento', codigo: 9, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
            { nomeContexto: 'Usuário', codigo: 10, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
        ];
    }
    Object.defineProperty(PermissaoComponent.prototype, "f", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    PermissaoComponent.prototype.ngOnInit = function () {
        this.validacao();
        this.carregarPermissao();
        this.controlarVisibilidadeCampoAtivo();
    };
    PermissaoComponent.prototype.limparCampos = function () {
        this.limpandoCampo = true;
        this.validacao();
    };
    PermissaoComponent.prototype.controlarVisibilidadeCampoAtivo = function () {
        if (this.estadoSalvar == 'cadastrarPermissao') {
            this.form.controls['ativo'].disable();
            return;
        }
        this.form.controls['ativo'].enable();
    };
    PermissaoComponent.prototype.carregarPermissao = function () {
        var _this = this;
        this.codigoPerfil = +this.activateRouter.snapshot.paramMap.get('codigoPermissao');
        if (this.codigoPerfil !== null && this.codigoPerfil !== 0) {
            this.estadoSalvar = 'atualizarPermissao';
            this.spinner.show('carregando');
            this.permissaoService.obterApenasUmaPermissao(this.codigoPerfil).subscribe({
                next: function (permissao) {
                    _this.usuarioPermissao = permissao[0];
                    _this.form.patchValue(_this.usuarioPermissao);
                    _this.atribuirPermissoesAoControleForm(permissao);
                },
                error: function (error) {
                    var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
                    _this.toaster[template.tipoMensagem]("Houve um erro ao carregar a permiss\u00E3o. Mensagem " + template.mensagemErro, template.titulo);
                }
            }).add(function () { return _this.spinner.hide('carregando'); });
        }
    };
    PermissaoComponent.prototype.atribuirPermissoesAoControleForm = function (permissao) {
        var acoesPorContexto = this.form.get('acoesPorContexto');
        for (var i = 0; i < permissao.length; i++) {
            for (var k = 0; k < permissao[i].codigosPermissao.length; k++) {
                this.permissoesPorContexto[permissao[i].codigoContexto - 1].permissoes[permissao[i].codigosPermissao[k] - 1].checked = true;
                var permissaoFormatada = permissao[i].codigoContexto + "-" + this.permissoesPorContexto[permissao[i].codigoContexto].permissoes[permissao[i].codigosPermissao[k] - 1].value;
                acoesPorContexto.push(new forms_1.FormControl(permissaoFormatada));
            }
        }
    };
    PermissaoComponent.prototype.validacao = function () {
        this.form = this.fb.group({
            codigoPerfil: new forms_1.FormControl(this.limpandoCampo ? this.form.get('codigoUsuarioPermissao').value : 0, []),
            descricaoPerfil: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(20)]),
            ativo: new forms_1.FormControl(true),
            acoesPorContexto: this.fb.array([], [forms_1.Validators.required])
        });
    };
    PermissaoComponent.prototype.onCheckBoxMarcada = function (e) {
        var acoesPorContexto = this.form.get('acoesPorContexto');
        if (e.checked) {
            acoesPorContexto.push(new forms_1.FormControl(e.source.value));
        }
        else {
            var i_1 = 0;
            acoesPorContexto.controls.forEach(function (item) {
                if (item.value == e.source.value) {
                    acoesPorContexto.removeAt(i_1);
                    return;
                }
                i_1++;
            });
        }
    };
    PermissaoComponent.prototype.salvarAlteracao = function () {
        var _this = this;
        var atualizando = this.estadoSalvar == 'atualizarPatrimonio';
        var nomeAcaoRealizada = atualizando ? 'atualizada' : 'cadastrada';
        this.spinner.show(nomeAcaoRealizada);
        this.usuarioPermissao = (this.estadoSalvar === 'cadastrarPermissao') ? __assign({}, this.form.value) : __assign({ codigoPerfil: this.usuarioPermissao.codigoPerfil }, this.form.value);
        this.permissaoService[this.estadoSalvar](this.usuarioPermissao).subscribe(function () { return _this.toaster.success("Permiss\u00E3o " + nomeAcaoRealizada + " com sucesso", 'Sucesso!'); }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem](MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "permissão", ['o', 'da']) + " Mensagem: " + template.mensagemErro, template.titulo);
        }, function () {
            setTimeout(function () {
                _this.router.navigate(['dashboard/permissao/listagem']);
            }, 1700);
        }).add(function () { return _this.spinner.hide(nomeAcaoRealizada); });
    };
    PermissaoComponent = __decorate([
        core_1.Component({
            selector: 'app-permissao',
            templateUrl: './permissao.component.html',
            styleUrls: ['./permissao.component.sass', '../../../assets/style-base.sass']
        })
    ], PermissaoComponent);
    return PermissaoComponent;
}());
exports.PermissaoComponent = PermissaoComponent;
