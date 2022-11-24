"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiService = void 0;
var core_1 = require("@angular/core");
var ApiService = /** @class */ (function () {
    //TODO: Passar para o service token
    function ApiService(http, encriptar, token) {
        this.http = http;
        this.encriptar = encriptar;
        this.token = token;
        this.options = {
            'Content-type': 'application/json'
        };
    }
    ApiService.prototype.get = function (url, options) {
        // @ts-ignore
        return this.http.get(url, __assign({ headers: __assign(__assign({}, this.options), { 'Authorization': "Bearer " + this.token.obterTokenDescriptografado() }) }, options));
    };
    ApiService.prototype.post = function (url, data, options) {
        // @ts-ignore
        return this.http.post(url, data, __assign({ headers: __assign(__assign({}, this.options), { 'Authorization': "Bearer " + this.token.obterTokenDescriptografado() }) }, options));
    };
    ApiService.prototype.postImage = function (url, data, options) {
        // @ts-ignore
        return this.http.post(url, data, __assign({ headers: {
                'Authorization': "Bearer " + this.token.obterTokenDescriptografado()
            } }, options));
    };
    ApiService.prototype.put = function (url, data, options) {
        // @ts-ignore
        return this.http.put(url, data, __assign({ headers: __assign(__assign({}, this.options), { 'Authorization': "Bearer " + this.token.obterTokenDescriptografado() }) }, options));
    };
    ApiService.prototype["delete"] = function (url, options) {
        // @ts-ignore
        return this.http["delete"](url, __assign({ headers: __assign(__assign({}, this.options), { 'Authorization': "Bearer " + this.token.obterTokenDescriptografado() }) }, options));
    };
    ApiService.prototype.patch = function (url, data, options) {
        throw new Error('Method not implemented.');
    };
    ApiService = __decorate([
        core_1.Injectable()
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
