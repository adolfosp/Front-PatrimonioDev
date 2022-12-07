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
exports.__esModule = true;
var http_1 = require("@angular/common/http");
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var angular_jwt_1 = require("@auth0/angular-jwt");
var categoria_service_1 = require("@nvs-services/categoria/categoria.service");
var ngx_spinner_1 = require("ngx-spinner");
var ngx_toastr_1 = require("ngx-toastr");
var api_service_1 = require("../../services/api/api.service");
var categoria_component_1 = require("./categoria.component");
var fakeActivatedRoute = {
    snapshot: { data: { "codigoCategoria": "1" } }
};
describe('CategoriaComponent', function () {
    var component;
    var fixture;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.TestBed.configureTestingModule({
                        declarations: [categoria_component_1.CategoriaComponent],
                        imports: [
                            forms_1.FormsModule, forms_1.ReactiveFormsModule,
                            ngx_toastr_1.ToastrModule.forRoot(),
                            http_1.HttpClientModule,
                            angular_jwt_1.JwtModule.forRoot({})
                        ],
                        providers: [
                            api_service_1.ApiService,
                            categoria_service_1.CategoriaService,
                            ngx_spinner_1.NgxSpinnerService,
                            angular_jwt_1.JwtHelperService,
                            { provide: router_1.ActivatedRoute, useValue: fakeActivatedRoute }
                        ]
                    })
                        .compileComponents()];
                case 1:
                    _a.sent();
                    fixture = testing_1.TestBed.createComponent(categoria_component_1.CategoriaComponent);
                    component = fixture.componentInstance;
                    fixture.detectChanges();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should has 2 inputs', function () {
        //Arrange & Act
        var formElement = fixture.debugElement.nativeElement.querySelector('#card_categoriaForm');
        var todosElementosInput = formElement.querySelectorAll('input');
        //Assert
        expect(todosElementosInput.length).toEqual(2);
    });
    it('should check initial form values for categoria form', function () {
        //Arrange & Act
        var categoriaValues = {
            codigoCategoria: 0,
            descricao: ''
        };
        //Assert
        expect(component.form.value).toEqual(categoriaValues);
    });
    it('should check descricao value before entering some value', function () {
        //Arrange & Act
        var descricaoFormGroup = component.form.get('descricao');
        //Assert
        expect(descricaoFormGroup.errors['required']).toBeTruthy();
    });
    it('should show error if maxlength is greater than 50 characters', function () {
        //Arrange & Act
        component.form.controls['descricao'].setValue("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do");
        var descricaoFromGroup = component.form.get('descricao');
        //Assert
        expect(descricaoFromGroup.errors['maxlength']).toBeTruthy();
    });
    it('should not show error if maxlength is less or equal to 50 characters', function () {
        //Arrange & Act
        component.form.controls['descricao'].setValue("Lorem ipsum dolor sit amet, consectetur adipisicin");
        var descricaoFormGroup = component.form.get('descricao');
        //Assert
        expect(descricaoFormGroup.errors).toEqual(null);
    });
    it('should show error if minlength is less to 2 characters', function () {
        //Arrange & Act
        component.form.controls['descricao'].setValue("L");
        var descricaoFromGroup = component.form.get('descricao');
        //Assert
        expect(descricaoFromGroup.errors['minlength']).toBeTruthy();
    });
    it('should error if minlength is less to 2 characters', function () {
        //Arrange & Act
        component.form.controls['descricao'].setValue("L");
        var descricaoFormGroup = component.form.get('descricao');
        //Assert
        expect(descricaoFormGroup.errors['minlength']).toBeTruthy();
    });
    it('should enable the button if does not have error in form', function () {
        //Arrange & Act
        component.form.controls['descricao'].setValue("Adolfo");
        var botaoSalvar = document.querySelector('.cadastrar');
        fixture.detectChanges();
        //Assert
        expect(botaoSalvar.disabled).toBeFalsy();
    });
    it('should not enable the button if does have error in form', function () {
        //Arrange & Act
        component.form.controls['descricao'].setValue("A");
        var botaoSalvar = document.querySelector('.cadastrar');
        fixture.detectChanges();
        //Assert
        expect(botaoSalvar.disabled).toBeTruthy();
    });
});
