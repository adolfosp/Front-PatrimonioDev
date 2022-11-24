"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EquipamentoModule = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var fabricante_service_1 = require("@nvs-services/fabricante/fabricante.service");
var modal_1 = require("ngx-bootstrap/modal");
var ngx_easy_table_1 = require("ngx-easy-table");
var ngx_spinner_1 = require("ngx-spinner");
var equipamento_service_1 = require("../../services/equipamento/equipamento.service");
var equipamento_routing_module_1 = require("./equipamento-routing.module");
var equipamento_component_1 = require("./equipamento.component");
var listagem_equipamento_component_1 = require("./listagem-equipamento/listagem-equipamento.component");
var EquipamentoModule = /** @class */ (function () {
    function EquipamentoModule() {
    }
    EquipamentoModule = __decorate([
        core_1.NgModule({
            imports: [
                equipamento_routing_module_1.EquipamentoRoutingModule,
                ngx_spinner_1.NgxSpinnerModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                ngx_easy_table_1.TableModule,
                input_1.MatInputModule,
                icon_1.MatIconModule,
                select_1.MatSelectModule,
            ],
            providers: [equipamento_service_1.EquipamentoService, fabricante_service_1.FabricanteService, modal_1.BsModalService],
            declarations: [equipamento_component_1.EquipamentoComponent, listagem_equipamento_component_1.ListagemEquipamentoComponent]
        })
    ], EquipamentoModule);
    return EquipamentoModule;
}());
exports.EquipamentoModule = EquipamentoModule;
