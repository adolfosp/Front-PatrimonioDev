"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PatrimonioModule = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/material/core");
var datepicker_1 = require("@angular/material/datepicker");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var ng_select_1 = require("@ng-select/ng-select");
var equipamento_service_1 = require("@nvs-services/equipamento/equipamento.service");
var funcionario_service_1 = require("@nvs-services/funcionario/funcionario.service");
var patrimonio_service_1 = require("@nvs-services/patrimonio/patrimonio.service");
var angularx_qrcode_1 = require("angularx-qrcode");
var modal_1 = require("ngx-bootstrap/modal");
var ngx_currency_1 = require("ngx-currency");
var ngx_easy_table_1 = require("ngx-easy-table");
var ngx_mask_1 = require("ngx-mask");
var ngx_spinner_1 = require("ngx-spinner");
var etiqueta_canvas_component_1 = require("../etiqueta-canvas/etiqueta-canvas.component");
var perda_component_1 = require("../perda/perda.component");
var listagem_patrimonio_component_1 = require("./listagem-patrimonio/listagem-patrimonio.component");
var patrimonio_routing_module_1 = require("./patrimonio-routing.module");
var patrimonio_component_1 = require("./patrimonio.component");
var PatrimonioModule = /** @class */ (function () {
    function PatrimonioModule() {
    }
    PatrimonioModule = __decorate([
        core_1.NgModule({
            imports: [
                patrimonio_routing_module_1.PatrimonioRoutingModule,
                ngx_spinner_1.NgxSpinnerModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                ngx_easy_table_1.TableModule,
                ng_select_1.NgSelectModule,
                angularx_qrcode_1.QRCodeModule,
                input_1.MatInputModule,
                icon_1.MatIconModule,
                select_1.MatSelectModule,
                datepicker_1.MatDatepickerModule,
                core_2.MatNativeDateModule,
                ngx_mask_1.NgxMaskModule,
                ngx_currency_1.NgxCurrencyModule
            ],
            providers: [patrimonio_service_1.PatrimonioService, equipamento_service_1.EquipamentoService, funcionario_service_1.FuncionarioService, modal_1.BsModalService],
            declarations: [patrimonio_component_1.PatrimonioComponent,
                listagem_patrimonio_component_1.ListagemPatrimonioComponent,
                etiqueta_canvas_component_1.EtiquetaCanvasComponent,
                perda_component_1.PerdaComponent]
        })
    ], PatrimonioModule);
    return PatrimonioModule;
}());
exports.PatrimonioModule = PatrimonioModule;
