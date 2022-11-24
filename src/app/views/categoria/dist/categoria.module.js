"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoriaModule = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var categoria_service_1 = require("@nvs-services/categoria/categoria.service");
var modal_1 = require("ngx-bootstrap/modal");
var ngx_easy_table_1 = require("ngx-easy-table");
var ngx_spinner_1 = require("ngx-spinner");
var categoria_routing_module_1 = require("./categoria-routing.module");
var categoria_component_1 = require("./categoria.component");
var listagem_categoria_component_1 = require("./listagem-categoria/listagem-categoria.component");
var CategoriaModule = /** @class */ (function () {
    function CategoriaModule() {
    }
    CategoriaModule = __decorate([
        core_1.NgModule({
            imports: [
                categoria_routing_module_1.CategoriaRoutingModule,
                ngx_spinner_1.NgxSpinnerModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                ngx_easy_table_1.TableModule,
                input_1.MatInputModule,
                icon_1.MatIconModule,
                select_1.MatSelectModule,
            ],
            providers: [categoria_service_1.CategoriaService, modal_1.BsModalService],
            declarations: [categoria_component_1.CategoriaComponent, listagem_categoria_component_1.ListagemCategoriaComponent]
        })
    ], CategoriaModule);
    return CategoriaModule;
}());
exports.CategoriaModule = CategoriaModule;
