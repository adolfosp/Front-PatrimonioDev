"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoleGuard = void 0;
var core_1 = require("@angular/core");
var RoleGuard = /** @class */ (function () {
    function RoleGuard(router, token) {
        this.router = router;
        this.token = token;
    }
    RoleGuard.prototype.canActivate = function (route) {
        return true;
        var permissaoEsperada = route.data['permissaoEsperada'];
        var permissaoToken = this.token.obterPermissaoToken();
        var permissaoEncontrada = permissaoEsperada.find(function (x) { return x == permissaoToken; });
        if (!this.token.usuarioEstaAutenticado() || permissaoEncontrada == undefined) {
            this.router.navigate(['403']);
            return false;
        }
        return true;
    };
    RoleGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RoleGuard);
    return RoleGuard;
}());
exports.RoleGuard = RoleGuard;
