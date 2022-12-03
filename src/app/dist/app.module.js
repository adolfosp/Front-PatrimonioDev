"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var ngx_spinner_1 = require("ngx-spinner");
var ngx_toastr_1 = require("ngx-toastr");
var angular_jwt_1 = require("@auth0/angular-jwt");
var api_service_1 = require("@nvs-services/api/api.service");
var ngx_easy_table_1 = require("ngx-easy-table");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var login_component_1 = require("./views/login/login.component");
var angularx_social_login_1 = require("@abacritt/angularx-social-login");
var button_1 = require("@angular/material/button");
var expansion_1 = require("@angular/material/expansion");
var form_field_1 = require("@angular/material/form-field");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var ngx_scanner_1 = require("@zxing/ngx-scanner");
var angularx_qrcode_1 = require("angularx-qrcode");
var ngx_echarts_1 = require("ngx-echarts");
var ngx_mask_1 = require("ngx-mask");
var environment_1 = require("src/environments/environment");
var dashboard_component_1 = require("./views/dashboard/dashboard.component");
var _403_component_1 = require("./views/error/403.component");
var _404_component_1 = require("./views/error/404.component");
var grafico_component_1 = require("./views/grafico/grafico.component");
var registrar_component_1 = require("./views/login/registrar/registrar.component");
var qr_code_component_1 = require("./views/qr-code/qr-code.component");
// eslint-disable-next-line sort-imports
var http_code_mensagem_component_1 = require("./views/shared/http-code-mensagem/http-code-mensagem.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                http_code_mensagem_component_1.HttpCodeMensagemComponent,
                _403_component_1.P403Component,
                _404_component_1.P404Component,
                qr_code_component_1.QrCodeComponent,
                registrar_component_1.RegistrarComponent,
                dashboard_component_1.DashboardComponent,
                grafico_component_1.GraficoComponent
            ],
            imports: [
                ngx_mask_1.NgxMaskModule.forRoot({
                    dropSpecialCharacters: false
                }),
                ngx_echarts_1.NgxEchartsModule.forRoot({
                    echarts: function () { return Promise.resolve().then(function () { return require('echarts'); }); }
                }),
                common_1.CommonModule,
                animations_1.BrowserAnimationsModule,
                ngx_spinner_1.NgxSpinnerModule,
                angularx_social_login_1.SocialLoginModule,
                forms_1.ReactiveFormsModule,
                platform_browser_1.BrowserModule,
                angularx_qrcode_1.QRCodeModule,
                http_1.HttpClientModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                ngx_scanner_1.ZXingScannerModule,
                ngx_easy_table_1.TableModule,
                ngx_toastr_1.ToastrModule.forRoot({
                    timeOut: 4000,
                    positionClass: 'toast-bottom-right',
                    preventDuplicates: true,
                    progressBar: true
                }),
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                icon_1.MatIconModule,
                button_1.MatButtonModule,
                slide_toggle_1.MatSlideToggleModule,
                expansion_1.MatExpansionModule
            ],
            providers: [
                api_service_1.ApiService,
                angular_jwt_1.JwtHelperService,
                { provide: angular_jwt_1.JWT_OPTIONS, useValue: angular_jwt_1.JWT_OPTIONS },
                {
                    provide: 'SocialAuthServiceConfig',
                    useValue: {
                        autoLogin: false,
                        providers: [
                            {
                                id: angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID,
                                provider: new angularx_social_login_1.GoogleLoginProvider(environment_1.environment.googleProvider)
                            },
                            ,
                            {
                                id: angularx_social_login_1.FacebookLoginProvider.PROVIDER_ID,
                                provider: new angularx_social_login_1.FacebookLoginProvider(environment_1.environment.facebookProvider)
                            }
                        ],
                        onError: function (err) {
                            console.error(err);
                        }
                    }
                },
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
