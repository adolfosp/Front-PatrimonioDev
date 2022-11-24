"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PermissaoModule = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var checkbox_1 = require("@angular/material/checkbox");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var modal_1 = require("ngx-bootstrap/modal");
var ngx_easy_table_1 = require("ngx-easy-table");
var ngx_spinner_1 = require("ngx-spinner");
var permissao_service_1 = require("../../services/permissao/permissao.service");
var shared_module_1 = require("../../shared.module");
var listagem_permissao_component_1 = require("./listagem-permissao/listagem-permissao.component");
var permissao_routing_module_1 = require("./permissao-routing.module");
var permissao_component_1 = require("./permissao.component");
var PermissaoModule = /** @class */ (function () {
    function PermissaoModule() {
    }
    PermissaoModule = __decorate([
        core_1.NgModule({
            imports: [
                permissao_routing_module_1.PermissaoRoutingModule,
                ngx_spinner_1.NgxSpinnerModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                shared_module_1.SharedModule,
                ngx_easy_table_1.TableModule,
                input_1.MatInputModule,
                icon_1.MatIconModule,
                select_1.MatSelectModule,
                checkbox_1.MatCheckboxModule
            ],
            providers: [permissao_service_1.PermissaoService, modal_1.BsModalService],
            declarations: [permissao_component_1.PermissaoComponent, listagem_permissao_component_1.ListagemPermissaoComponent]
        })
    ], PermissaoModule);
    return PermissaoModule;
}());
exports.PermissaoModule = PermissaoModule;
