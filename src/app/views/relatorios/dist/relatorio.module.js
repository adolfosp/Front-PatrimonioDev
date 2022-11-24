"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RelatorioModule = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var perda_service_1 = require("@nvs-services/perda/perda.service");
var ngx_easy_table_1 = require("ngx-easy-table");
var ngx_spinner_1 = require("ngx-spinner");
var ngx_toastr_1 = require("ngx-toastr");
var relatorio_perda_component_1 = require("./relatorio-perda/relatorio-perda.component");
var relatorio_routing_module_1 = require("./relatorio-routing.module");
var RelatorioModule = /** @class */ (function () {
    function RelatorioModule() {
    }
    RelatorioModule = __decorate([
        core_1.NgModule({
            imports: [
                relatorio_routing_module_1.RelatorioRoutingModule,
                ngx_spinner_1.NgxSpinnerModule,
                ngx_easy_table_1.TableModule,
                common_1.CommonModule,
                input_1.MatInputModule,
                icon_1.MatIconModule,
            ],
            providers: [perda_service_1.PerdaService, ngx_toastr_1.ToastrService, ngx_spinner_1.NgxSpinnerService],
            declarations: [relatorio_perda_component_1.RelatorioPerdaComponent]
        })
    ], RelatorioModule);
    return RelatorioModule;
}());
exports.RelatorioModule = RelatorioModule;
