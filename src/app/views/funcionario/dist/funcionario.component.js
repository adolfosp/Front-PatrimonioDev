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
exports.FuncionarioComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var FuncionarioComponent = /** @class */ (function () {
    function FuncionarioComponent(fb, funcionarioService, setorService, toaster, spinner, router, activateRouter) {
        this.fb = fb;
        this.funcionarioService = funcionarioService;
        this.setorService = setorService;
        this.toaster = toaster;
        this.spinner = spinner;
        this.router = router;
        this.activateRouter = activateRouter;
        this.funcionario = {};
        this.estadoSalvar = 'cadastrarFuncionario';
        this.limpandoCampo = false;
    }
    Object.defineProperty(FuncionarioComponent.prototype, "f", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    FuncionarioComponent.prototype.ngOnInit = function () {
        this.validacao();
        this.carregarFuncionario();
        this.carregarSetor();
        this.controlarVisibilidadeCampoAtivo();
    };
    FuncionarioComponent.prototype.limparCampos = function () {
        this.limpandoCampo = true;
        this.validacao();
    };
    FuncionarioComponent.prototype.carregarSetor = function () {
        var _this = this;
        this.setorService.obterSetor().subscribe({
            next: function (setores) {
                _this.setores = setores;
            },
            error: function (error) {
                _this.toaster.error("Houve um erro ao carregar o setor. Mensagem " + error.message, 'Erro!');
            }
        });
    };
    FuncionarioComponent.prototype.controlarVisibilidadeCampoAtivo = function () {
        if (this.estadoSalvar == 'cadastrarFuncionario')
            this.form.controls['ativo'].disable();
        else
            this.form.controls['ativo'].enable();
    };
    FuncionarioComponent.prototype.validacao = function () {
        this.form = this.fb.group({
            codigoFuncionario: new forms_1.FormControl(this.limpandoCampo ? this.form.get('codigoFuncionario').value : 0, []),
            nomeFuncionario: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.maxLength(100)]),
            ativo: new forms_1.FormControl(true),
            codigoSetor: new forms_1.FormControl('', [forms_1.Validators.required]),
            observacao: new forms_1.FormControl('')
        });
    };
    FuncionarioComponent.prototype.salvarAlteracao = function () {
        var _this = this;
        var atualizando = this.estadoSalvar == 'atualizarFuncionario';
        var nomeAcaoRealizada = atualizando ? 'atualizado' : 'cadastrado';
        this.spinner.show(nomeAcaoRealizada);
        this.funcionario = (this.estadoSalvar === 'cadastrarFuncionario') ? __assign({}, this.form.value) : __assign({ codigoFuncionario: this.funcionario.codigoFuncionario }, this.form.value);
        this.funcionarioService[this.estadoSalvar](this.funcionario).subscribe(function () { return _this.toaster.success("Funcion\u00E1rio " + nomeAcaoRealizada + " com sucesso", 'Sucesso!'); }, function (error) {
            debugger;
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem](MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "funcionário", ['o', 'do']) + " Mensagem: " + template.mensagemErro, template.titulo);
        }, function () {
            setTimeout(function () {
                _this.router.navigate(['dashboard/funcionario/listagem']);
            }, 1700);
        }).add(function () { return _this.spinner.hide(nomeAcaoRealizada); });
    };
    FuncionarioComponent.prototype.carregarFuncionario = function () {
        var _this = this;
        this.codigoFuncionario = +this.activateRouter.snapshot.paramMap.get('codigoFuncionario');
        if (this.codigoFuncionario !== null && this.codigoFuncionario !== 0) {
            this.estadoSalvar = 'atualizarFuncionario';
            this.spinner.show('carregando');
            this.funcionarioService.obterApenasUmFuncionario(this.codigoFuncionario).subscribe({
                next: function (funcionario) {
                    _this.funcionario = __assign({}, funcionario);
                    _this.form.patchValue(_this.funcionario);
                },
                error: function (error) {
                    var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
                    _this.toaster[template.tipoMensagem]("Houve um erro ao tentar carregar o funcion\u00E1rio. Mensagem: " + template.mensagemErro, template.titulo);
                }
            }).add(function () { return _this.spinner.hide('carregando'); });
        }
    };
    FuncionarioComponent = __decorate([
        core_1.Component({
            selector: 'app-funcionario',
            templateUrl: './funcionario.component.html',
            styleUrls: ['./funcionario.component.sass', '../../../assets/style-base.sass']
        })
    ], FuncionarioComponent);
    return FuncionarioComponent;
}());
exports.FuncionarioComponent = FuncionarioComponent;
