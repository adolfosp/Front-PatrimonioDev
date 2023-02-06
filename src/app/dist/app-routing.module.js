"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("@nvs-guards/auth.guard");
var custom_preload_strategy_1 = require("./configs/custom-preload-strategy");
var dashboard_component_1 = require("./views/dashboard/dashboard.component");
var grafico_component_1 = require("./views/grafico/grafico.component");
var login_component_1 = require("./views/login/login.component");
var registrar_component_1 = require("./views/login/registrar/registrar.component");
var perda_component_1 = require("./views/perda/perda.component");
var qr_code_component_1 = require("./views/qr-code/qr-code.component");
var routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent,
        data: {
            title: 'Login'
        }
    },
    {
        path: 'registrar',
        component: registrar_component_1.RegistrarComponent,
        data: {
            title: 'registrar'
        }
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent,
        children: [
            {
                path: '',
                component: grafico_component_1.GraficoComponent,
                data: {
                    title: 'gráficos'
                }
            },
            {
                path: 'qr-code',
                component: qr_code_component_1.QrCodeComponent,
                data: {
                    title: 'qr-code'
                }
            },
            {
                path: 'perda',
                canActivate: [auth_guard_1.AuthGuard],
                component: perda_component_1.PerdaComponent,
                data: {
                    title: 'perda'
                }
            },
            {
                path: 'empresa',
                loadChildren: function () { return Promise.resolve().then(function () { return require('../app/views/empresa/empresa.module'); }).then(function (m) { return m.EmpresaModule; }); }
            },
            {
                path: 'funcionario',
                loadChildren: function () { return Promise.resolve().then(function () { return require('../app/views/funcionario/funcionario.module'); }).then(function (m) { return m.FuncionarioModule; }); }
            },
            {
                path: 'usuario',
                loadChildren: function () { return Promise.resolve().then(function () { return require('../app/views/usuario/usuario.module'); }).then(function (m) { return m.UsuarioModule; }); }
            },
            {
                path: 'setor',
                loadChildren: function () { return Promise.resolve().then(function () { return require('../app/views/setor/setor.module'); }).then(function (m) { return m.SetorModule; }); }
            },
            {
                path: 'fabricante',
                loadChildren: function () { return Promise.resolve().then(function () { return require('../app/views/fabricante/fabricante.module'); }).then(function (m) { return m.FabricanteModule; }); }
            },
            {
                path: 'permissao',
                loadChildren: function () { return Promise.resolve().then(function () { return require('../app/views/permissao/permissao.module'); }).then(function (m) { return m.PermissaoModule; }); }
            },
            {
                path: 'equipamento',
                loadChildren: function () { return Promise.resolve().then(function () { return require('../app/views/equipamento/equipamento.module'); }).then(function (m) { return m.EquipamentoModule; }); },
                data: { preload: true }
            },
            {
                path: 'categoria',
                loadChildren: function () { return Promise.resolve().then(function () { return require('../app/views/categoria/categoria.module'); }).then(function (m) { return m.CategoriaModule; }); }
            },
            {
                path: 'relatorio',
                loadChildren: function () { return Promise.resolve().then(function () { return require('../app/views/relatorios/relatorio.module'); }).then(function (m) { return m.RelatorioModule; }); }
            },
            {
                path: 'movimentacao',
                loadChildren: function () { return Promise.resolve().then(function () { return require('../app/views/movimentacao/movimentacao.module'); }).then(function (m) { return m.MovimentacaoModule; }); },
                data: { preload: true }
            },
            {
                path: 'patrimonio',
                loadChildren: function () { return Promise.resolve().then(function () { return require('../app/views/patrimonio/patrimonio.module'); }).then(function (m) { return m.PatrimonioModule; }); },
                data: { preload: true }
            },
        ],
        data: {
            title: 'dashboard'
        }
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, { preloadingStrategy: custom_preload_strategy_1.CustomPreloader })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
exports["default"] = routes;
