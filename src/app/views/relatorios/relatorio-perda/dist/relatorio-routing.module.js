"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PermissaoModule = void 0;
var core_1 = require("@angular/core");
var ngx_spinner_1 = require("ngx-spinner");
var ngx_toastr_1 = require("ngx-toastr");
var perda_service_1 = require("../../../services/perda/perda.service");
var relatorio_perda_component_1 = require("./relatorio-perda.component");
var PermissaoModule = /** @class */ (function () {
    function PermissaoModule() {
    }
    PermissaoModule = __decorate([
        core_1.NgModule({
            imports: [
                ngx_spinner_1.NgxSpinnerModule,
            ],
            providers: [perda_service_1.PerdaService, ngx_toastr_1.ToastrService, ngx_spinner_1.NgxSpinnerService],
            declarations: [relatorio_perda_component_1.RelatorioPerdaComponent]
        })
    ], PermissaoModule);
    return PermissaoModule;
}());
exports.PermissaoModule = PermissaoModule;
