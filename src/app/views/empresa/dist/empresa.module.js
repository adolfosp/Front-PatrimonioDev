"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EmpresaModule = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var empresa_service_1 = require("@nvs-services/empresa/empresa.service");
var modal_1 = require("ngx-bootstrap/modal");
var ngx_currency_1 = require("ngx-currency");
var ngx_easy_table_1 = require("ngx-easy-table");
var ngx_mask_1 = require("ngx-mask");
var ngx_spinner_1 = require("ngx-spinner");
var shared_module_1 = require("../../shared.module");
var empresa_routing_module_1 = require("./empresa-routing.module");
var empresa_component_1 = require("./empresa.component");
var listagem_empresa_component_1 = require("./listagem-empresa/listagem-empresa.component");
var EmpresaModule = /** @class */ (function () {
    function EmpresaModule() {
    }
    EmpresaModule = __decorate([
        core_1.NgModule({
            imports: [
                empresa_routing_module_1.EmpresaRoutingModule,
                forms_1.FormsModule,
                ngx_spinner_1.NgxSpinnerModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                ngx_easy_table_1.TableModule,
                shared_module_1.SharedModule,
                input_1.MatInputModule,
                icon_1.MatIconModule,
                select_1.MatSelectModule,
                ngx_mask_1.NgxMaskModule.forChild(),
                ngx_currency_1.NgxCurrencyModule
            ],
            providers: [empresa_service_1.EmpresaService, modal_1.BsModalService],
            declarations: [empresa_component_1.EmpresaComponent, listagem_empresa_component_1.ListagemEmpresaComponent]
        })
    ], EmpresaModule);
    return EmpresaModule;
}());
exports.EmpresaModule = EmpresaModule;
