"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var router_1 = require("@angular/router");
var testing_2 = require("@angular/router/testing");
var angular_jwt_1 = require("@auth0/angular-jwt");
var categoria_service_1 = require("@nvs-services/categoria/categoria.service");
var token_service_1 = require("@nvs-services/token/token.service");
var modal_1 = require("ngx-bootstrap/modal");
var ngx_spinner_1 = require("ngx-spinner");
var ngx_toastr_1 = require("ngx-toastr");
var rxjs_1 = require("rxjs");
var app_routing_module_1 = require("../../../app-routing.module");
var categoria_module_1 = require("../categoria.module");
var listagem_categoria_component_1 = require("./listagem-categoria.component");
var mockEstadosServiceData = null;
var MockEstadosService = /** @class */ (function () {
    function MockEstadosService() {
    }
    MockEstadosService.prototype.obterTodasCategorias = function () {
        return mockEstadosServiceData;
    };
    return MockEstadosService;
}());
var MockTokenService = /** @class */ (function () {
    function MockTokenService() {
    }
    MockTokenService.prototype.ehUsuarioAdministrador = function () {
        return true;
    };
    return MockTokenService;
}());
var importsModules = [
    categoria_module_1.CategoriaModule,
    animations_1.BrowserAnimationsModule,
    testing_2.RouterTestingModule,
    ngx_toastr_1.ToastrModule.forRoot(),
    http_1.HttpClientModule,
    angular_jwt_1.JwtModule.forRoot({}),
];
var providers = [
    { provide: categoria_service_1.CategoriaService, useClass: MockEstadosService },
    { provide: token_service_1.TokenService, useClass: MockTokenService },
    ngx_spinner_1.NgxSpinnerService,
    modal_1.BsModalService,
    angular_jwt_1.JwtHelperService,
    core_1.ChangeDetectorRef,
];
describe("ListagemCategoriaComponent", function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.TestBed.configureTestingModule({
                        declarations: [listagem_categoria_component_1.ListagemCategoriaComponent],
                        imports: __spreadArrays(importsModules),
                        providers: __spreadArrays(providers)
                    }).compileComponents()];
                case 1:
                    _a.sent();
                    localStorage.setItem("Valor", "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");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should create the app", function () {
        var fixture = testing_1.TestBed.createComponent(listagem_categoria_component_1.ListagemCategoriaComponent);
        var app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
    it("should render grid component", function () {
        //Arrange
        var fixture = testing_1.TestBed.createComponent(listagem_categoria_component_1.ListagemCategoriaComponent);
        var dadosMockados = [{ codigoCategoria: 1, descricao: "adolfo" }];
        mockEstadosServiceData = rxjs_1.of(dadosMockados);
        //Act
        fixture.detectChanges();
        //Assert
        var celulasDaTabela = fixture.debugElement.queryAll(platform_browser_1.By.css("td"));
        expect(celulasDaTabela[0].nativeElement.innerText).toBe(dadosMockados[0].codigoCategoria.toString());
        expect(celulasDaTabela[1].nativeElement.innerText).toBe(dadosMockados[0].descricao);
    });
});
fdescribe("should open route correctly", function () {
    var location;
    var router;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: __spreadArrays([testing_2.RouterTestingModule.withRoutes(app_routing_module_1["default"])], importsModules),
            declarations: [listagem_categoria_component_1.ListagemCategoriaComponent],
            providers: __spreadArrays(providers)
        });
        router = testing_1.TestBed.inject(router_1.Router);
        location = testing_1.TestBed.inject(common_1.Location);
        router.initialNavigation();
    });
    it('when click button new should redirect to /dashboard/categoria', testing_1.fakeAsync(function () {
        //Arrange
        fixture = testing_1.TestBed.createComponent(listagem_categoria_component_1.ListagemCategoriaComponent);
        var button = fixture.debugElement.nativeElement.querySelector("#button-novo");
        //Act
        button.click();
        testing_1.tick();
        //Assert
        expect(location.path()).toBe("/dashboard/categoria");
    }));
    it('should redirect to /dashboard/categoria/1 when to click button edit', testing_1.fakeAsync(function () {
        //Arrange
        fixture = testing_1.TestBed.createComponent(listagem_categoria_component_1.ListagemCategoriaComponent);
        var dadosMockados = [{ codigoCategoria: 1, descricao: "adolfo" }];
        mockEstadosServiceData = rxjs_1.of(dadosMockados);
        fixture.detectChanges();
        var button = fixture.debugElement.nativeElement.querySelector('.botao-alterar');
        //Act
        button.click();
        testing_1.tick();
        //Assert
        expect(location.path()).toBe("/dashboard/categoria/1");
        testing_1.flush();
    }));
});
