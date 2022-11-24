"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FabricanteModule = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var fabricante_service_1 = require("@nvs-services/fabricante/fabricante.service");
var modal_1 = require("ngx-bootstrap/modal");
var ngx_easy_table_1 = require("ngx-easy-table");
var ngx_spinner_1 = require("ngx-spinner");
var fabricante_routing_module_1 = require("./fabricante-routing.module");
var fabricante_component_1 = require("./fabricante.component");
var listagem_fabricante_component_1 = require("./listagem-fabricante/listagem-fabricante.component");
var FabricanteModule = /** @class */ (function () {
    function FabricanteModule() {
    }
    FabricanteModule = __decorate([
        core_1.NgModule({
            imports: [
                fabricante_routing_module_1.FabricanteRoutingModule,
                forms_1.FormsModule,
                ngx_spinner_1.NgxSpinnerModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                ngx_easy_table_1.TableModule,
                input_1.MatInputModule,
                icon_1.MatIconModule
            ],
            providers: [fabricante_service_1.FabricanteService, modal_1.BsModalService],
            declarations: [fabricante_component_1.FabricanteComponent, listagem_fabricante_component_1.ListagemFabricanteComponent]
        })
    ], FabricanteModule);
    return FabricanteModule;
}());
exports.FabricanteModule = FabricanteModule;
