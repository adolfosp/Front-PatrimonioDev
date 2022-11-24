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
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var angular_jwt_1 = require("@auth0/angular-jwt");
var api_service_1 = require("@nvs-services/api/api.service");
var categoria_service_1 = require("@nvs-services/categoria/categoria.service");
var modal_1 = require("ngx-bootstrap/modal");
var ngx_spinner_1 = require("ngx-spinner");
var ngx_toastr_1 = require("ngx-toastr");
var listagem_categoria_component_1 = require("./listagem-categoria.component");
fdescribe('ListagemCategoriaComponent', function () {
    var component;
    var fixture;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.TestBed.configureTestingModule({
                        declarations: [listagem_categoria_component_1.ListagemCategoriaComponent],
                        imports: [
                            ngx_toastr_1.ToastrModule.forRoot(),
                            http_1.HttpClientModule,
                            angular_jwt_1.JwtModule.forRoot({})
                        ],
                        providers: [
                            api_service_1.ApiService,
                            categoria_service_1.CategoriaService,
                            ngx_spinner_1.NgxSpinnerService,
                            modal_1.BsModalService,
                            angular_jwt_1.JwtHelperService,
                            core_1.ChangeDetectorRef
                        ]
                    })
                        .compileComponents()];
                case 1:
                    _a.sent();
                    fixture = testing_1.TestBed.createComponent(listagem_categoria_component_1.ListagemCategoriaComponent);
                    component = fixture.componentInstance;
                    localStorage.setItem("Valor", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzb2VzIjoiW3tcIkNvZGlnb1VzdWFyaW9cIjoxLFwiTm9tZVwiOlwiQURPTEZPXCIsXCJEZXNjcmljYW9Db250ZXh0b1wiOlwiQ2F0ZWdvcmlhRXF1aXBhbWVudG9cIixcIlBlcm1pc3NvZXNcIjpcIiBBbHRlcmFyLCBBZGljaW9uYXIsIExpc3RhciwgRXhjbHVpciwgRGVzYXRpdmFyXCIsXCJUb2tlblwiOm51bGx9LHtcIkNvZGlnb1VzdWFyaW9cIjoxLFwiTm9tZVwiOlwiQURPTEZPXCIsXCJEZXNjcmljYW9Db250ZXh0b1wiOlwiRW1wcmVzYVwiLFwiUGVybWlzc29lc1wiOlwiIEFsdGVyYXIsIEFkaWNpb25hciwgTGlzdGFyLCBFeGNsdWlyLCBEZXNhdGl2YXJcIixcIlRva2VuXCI6bnVsbH0se1wiQ29kaWdvVXN1YXJpb1wiOjEsXCJOb21lXCI6XCJBRE9MRk9cIixcIkRlc2NyaWNhb0NvbnRleHRvXCI6XCJFcXVpcGFtZW50b1wiLFwiUGVybWlzc29lc1wiOlwiIEFsdGVyYXIsIEFkaWNpb25hciwgTGlzdGFyLCBFeGNsdWlyLCBEZXNhdGl2YXJcIixcIlRva2VuXCI6bnVsbH0se1wiQ29kaWdvVXN1YXJpb1wiOjEsXCJOb21lXCI6XCJBRE9MRk9cIixcIkRlc2NyaWNhb0NvbnRleHRvXCI6XCJGYWJyaWNhbnRlXCIsXCJQZXJtaXNzb2VzXCI6XCIgQWx0ZXJhciwgQWRpY2lvbmFyLCBMaXN0YXIsIEV4Y2x1aXIsIERlc2F0aXZhclwiLFwiVG9rZW5cIjpudWxsfSx7XCJDb2RpZ29Vc3VhcmlvXCI6MSxcIk5vbWVcIjpcIkFET0xGT1wiLFwiRGVzY3JpY2FvQ29udGV4dG9cIjpcIkZ1bmNpb25hcmlvXCIsXCJQZXJtaXNzb2VzXCI6XCIgQWx0ZXJhciwgQWRpY2lvbmFyLCBMaXN0YXIsIEV4Y2x1aXIsIERlc2F0aXZhclwiLFwiVG9rZW5cIjpudWxsfSx7XCJDb2RpZ29Vc3VhcmlvXCI6MSxcIk5vbWVcIjpcIkFET0xGT1wiLFwiRGVzY3JpY2FvQ29udGV4dG9cIjpcIk1vdmltZW50YWNhb1wiLFwiUGVybWlzc29lc1wiOlwiIEFsdGVyYXIsIEFkaWNpb25hciwgTGlzdGFyLCBFeGNsdWlyLCBEZXNhdGl2YXJcIixcIlRva2VuXCI6bnVsbH0se1wiQ29kaWdvVXN1YXJpb1wiOjEsXCJOb21lXCI6XCJBRE9MRk9cIixcIkRlc2NyaWNhb0NvbnRleHRvXCI6XCJQYXRyaW1vbmlvXCIsXCJQZXJtaXNzb2VzXCI6XCIgQWx0ZXJhciwgQWRpY2lvbmFyLCBMaXN0YXIsIEV4Y2x1aXIsIERlc2F0aXZhclwiLFwiVG9rZW5cIjpudWxsfSx7XCJDb2RpZ29Vc3VhcmlvXCI6MSxcIk5vbWVcIjpcIkFET0xGT1wiLFwiRGVzY3JpY2FvQ29udGV4dG9cIjpcIlBlcmRhXCIsXCJQZXJtaXNzb2VzXCI6XCIgQWx0ZXJhciwgQWRpY2lvbmFyLCBMaXN0YXIsIEV4Y2x1aXIsIERlc2F0aXZhclwiLFwiVG9rZW5cIjpudWxsfSx7XCJDb2RpZ29Vc3VhcmlvXCI6MSxcIk5vbWVcIjpcIkFET0xGT1wiLFwiRGVzY3JpY2FvQ29udGV4dG9cIjpcIlBlcmZpbFwiLFwiUGVybWlzc29lc1wiOlwiIEFsdGVyYXIsIEFkaWNpb25hciwgTGlzdGFyLCBFeGNsdWlyLCBEZXNhdGl2YXJcIixcIlRva2VuXCI6bnVsbH0se1wiQ29kaWdvVXN1YXJpb1wiOjEsXCJOb21lXCI6XCJBRE9MRk9cIixcIkRlc2NyaWNhb0NvbnRleHRvXCI6XCJQZXJtaXNzYW9cIixcIlBlcm1pc3NvZXNcIjpcIiBBbHRlcmFyLCBBZGljaW9uYXIsIExpc3RhciwgRXhjbHVpciwgRGVzYXRpdmFyXCIsXCJUb2tlblwiOm51bGx9LHtcIkNvZGlnb1VzdWFyaW9cIjoxLFwiTm9tZVwiOlwiQURPTEZPXCIsXCJEZXNjcmljYW9Db250ZXh0b1wiOlwiU2V0b3JcIixcIlBlcm1pc3NvZXNcIjpcIiBBbHRlcmFyLCBBZGljaW9uYXIsIExpc3RhciwgRXhjbHVpciwgRGVzYXRpdmFyXCIsXCJUb2tlblwiOm51bGx9LHtcIkNvZGlnb1VzdWFyaW9cIjoxLFwiTm9tZVwiOlwiQURPTEZPXCIsXCJEZXNjcmljYW9Db250ZXh0b1wiOlwiVXN1YXJpb1wiLFwiUGVybWlzc29lc1wiOlwiIEFsdGVyYXIsIEFkaWNpb25hciwgTGlzdGFyLCBFeGNsdWlyLCBEZXNhdGl2YXJcIixcIlRva2VuXCI6bnVsbH1dIiwiY29kaWdvVXN1YXJpbyI6IjEiLCJub21lVXN1YXJpbyI6IkFET0xGTyIsImV4cCI6MTY2ODEzMTUxMywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzODAiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM4MCJ9.sIZaY52tVYP97YeG88nHo_VzSeuC7o1D4DgGb3hPBfQ");
                    fixture.detectChanges();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
