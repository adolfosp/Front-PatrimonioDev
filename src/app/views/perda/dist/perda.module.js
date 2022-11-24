"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PerdaModule = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var perda_service_1 = require("@nvs-services/perda/perda.service");
var ngx_spinner_1 = require("ngx-spinner");
var perda_routing_module_1 = require("./perda-routing.module");
var PerdaModule = /** @class */ (function () {
    function PerdaModule() {
    }
    PerdaModule = __decorate([
        core_1.NgModule({
            imports: [
                perda_routing_module_1.PerdaRoutingModule,
                ngx_spinner_1.NgxSpinnerModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                forms_1.FormsModule
            ],
            providers: [perda_service_1.PerdaService],
            declarations: []
        })
    ], PerdaModule);
    return PerdaModule;
}());
exports.PerdaModule = PerdaModule;
