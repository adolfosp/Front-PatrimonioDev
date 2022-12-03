"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsuarioModule = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var empresa_service_1 = require("@nvs-services/empresa/empresa.service");
var permissao_service_1 = require("@nvs-services/permissao/permissao.service");
var setor_service_1 = require("@nvs-services/setor/setor.service");
var token_service_1 = require("@nvs-services/token/token.service");
var usuario_service_1 = require("@nvs-services/usuario/usuario.service");
var modal_1 = require("ngx-bootstrap/modal");
var ngx_easy_table_1 = require("ngx-easy-table");
var ngx_spinner_1 = require("ngx-spinner");
var listagem_usuario_component_1 = require("./listagem-usuario/listagem-usuario.component");
var perfil_component_1 = require("./perfil/perfil.component");
var usuario_routing_module_1 = require("./usuario-routing.module");
var usuario_component_1 = require("./usuario.component");
var shared_component_module_1 = require("../shared/shared-component.module");
var UsuarioModule = /** @class */ (function () {
    function UsuarioModule() {
    }
    UsuarioModule = __decorate([
        core_1.NgModule({
            imports: [
                usuario_routing_module_1.UsuarioRoutingModule,
                ngx_spinner_1.NgxSpinnerModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                ngx_easy_table_1.TableModule,
                input_1.MatInputModule,
                icon_1.MatIconModule,
                select_1.MatSelectModule,
                shared_component_module_1.SharedComponentModule
            ],
            providers: [usuario_service_1.UsuarioService, modal_1.BsModalService, token_service_1.TokenService, setor_service_1.SetorService, empresa_service_1.EmpresaService, permissao_service_1.PermissaoService],
            declarations: [usuario_component_1.UsuarioComponent, listagem_usuario_component_1.ListagemUsuarioComponent, perfil_component_1.PerfilComponent]
        })
    ], UsuarioModule);
    return UsuarioModule;
}());
exports.UsuarioModule = UsuarioModule;
