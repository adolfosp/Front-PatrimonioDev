"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FuncionarioModule = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var funcionario_service_1 = require("@nvs-services/funcionario/funcionario.service");
var modal_1 = require("ngx-bootstrap/modal");
var ngx_easy_table_1 = require("ngx-easy-table");
var ngx_spinner_1 = require("ngx-spinner");
var shared_module_1 = require("src/app/shared.module");
var setor_service_1 = require("../../services/setor/setor.service");
var funcionario_routing_module_1 = require("./funcionario-routing.module");
var funcionario_component_1 = require("./funcionario.component");
var listagem_funcionario_component_1 = require("./listagem-funcionario/listagem-funcionario.component");
var FuncionarioModule = /** @class */ (function () {
    function FuncionarioModule() {
    }
    FuncionarioModule = __decorate([
        core_1.NgModule({
            imports: [
                funcionario_routing_module_1.FuncionarioRoutingModule,
                forms_1.FormsModule,
                ngx_spinner_1.NgxSpinnerModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                ngx_easy_table_1.TableModule,
                shared_module_1.SharedModule,
                input_1.MatInputModule,
                icon_1.MatIconModule,
                select_1.MatSelectModule,
            ],
            providers: [funcionario_service_1.FuncionarioService, modal_1.BsModalService, setor_service_1.SetorService],
            declarations: [funcionario_component_1.FuncionarioComponent, listagem_funcionario_component_1.ListagemFuncionarioComponent]
        })
    ], FuncionarioModule);
    return FuncionarioModule;
}());
exports.FuncionarioModule = FuncionarioModule;
