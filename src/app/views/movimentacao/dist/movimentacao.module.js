"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MovimentacaoModule = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/material/core");
var datepicker_1 = require("@angular/material/datepicker");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var movimentacao_service_1 = require("@nvs-services/movimentacao/movimentacao.service");
var ngx_easy_table_1 = require("ngx-easy-table");
var ngx_spinner_1 = require("ngx-spinner");
var shared_module_1 = require("src/app/shared.module");
var listagem_movimentacao_component_1 = require("./listagem-movimentacao/listagem-movimentacao.component");
var movimentacao_routing_module_1 = require("./movimentacao-routing.module");
var movimentacao_component_1 = require("./movimentacao.component");
var MovimentacaoModule = /** @class */ (function () {
    function MovimentacaoModule() {
    }
    MovimentacaoModule = __decorate([
        core_1.NgModule({
            imports: [
                movimentacao_routing_module_1.MovimentacaoRoutingModule,
                ngx_spinner_1.NgxSpinnerModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                ngx_easy_table_1.TableModule,
                shared_module_1.SharedModule,
                input_1.MatInputModule,
                icon_1.MatIconModule,
                datepicker_1.MatDatepickerModule,
                core_2.MatNativeDateModule,
                select_1.MatSelectModule,
            ],
            providers: [movimentacao_service_1.MovimentacaoService],
            declarations: [movimentacao_component_1.MovimentacaoComponent, listagem_movimentacao_component_1.ListagemMovimentacaoComponent]
        })
    ], MovimentacaoModule);
    return MovimentacaoModule;
}());
exports.MovimentacaoModule = MovimentacaoModule;
