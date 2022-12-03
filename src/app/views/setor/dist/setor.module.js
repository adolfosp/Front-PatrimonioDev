"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SetorModule = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var setor_service_1 = require("@nvs-services/setor/setor.service");
var modal_1 = require("ngx-bootstrap/modal");
var ngx_easy_table_1 = require("ngx-easy-table");
var ngx_spinner_1 = require("ngx-spinner");
var shared_component_module_1 = require("../shared/shared-component.module");
var listagem_setor_component_1 = require("./listagem-setor/listagem-setor.component");
var setor_routing_module_1 = require("./setor-routing.module");
var setor_component_1 = require("./setor.component");
var SetorModule = /** @class */ (function () {
    function SetorModule() {
    }
    SetorModule = __decorate([
        core_1.NgModule({
            providers: [setor_service_1.SetorService, modal_1.BsModalService],
            declarations: [setor_component_1.SetorComponent, listagem_setor_component_1.ListagemSetorComponent],
            imports: [
                setor_routing_module_1.SetorRoutingModule,
                ngx_spinner_1.NgxSpinnerModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                ngx_easy_table_1.TableModule,
                input_1.MatInputModule,
                icon_1.MatIconModule,
                shared_component_module_1.SharedComponentModule
            ]
        })
    ], SetorModule);
    return SetorModule;
}());
exports.SetorModule = SetorModule;
