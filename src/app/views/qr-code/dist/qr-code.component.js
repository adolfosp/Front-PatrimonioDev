"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.QrCodeComponent = void 0;
var core_1 = require("@angular/core");
var library_1 = require("@zxing/library");
var QrCodeComponent = /** @class */ (function () {
    function QrCodeComponent() {
        this.allowedFormats = [library_1.BarcodeFormat.QR_CODE, library_1.BarcodeFormat.EAN_13, library_1.BarcodeFormat.CODE_128, library_1.BarcodeFormat.DATA_MATRIX /*, ...*/];
    }
    QrCodeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.scanner.permissionResponse.subscribe(function (perm) { return _this.hasPermission = perm; });
    };
    QrCodeComponent.prototype.handleQrCodeResult = function (resultString) {
        this.qrResultString = resultString;
    };
    QrCodeComponent.prototype.obterDispositivos = function (a) {
        this.hasDevices = true;
        this.availableDevices = a;
    };
    QrCodeComponent.prototype.onDeviceSelectChange = function (selectedValue) {
        for (var _i = 0, _a = this.availableDevices; _i < _a.length; _i++) {
            var device = _a[_i];
            if (device.deviceId === selectedValue) {
                this.currentDevice = device;
                return;
            }
        }
    };
    QrCodeComponent.prototype.stateToEmoji = function (state) {
        var states = {
            undefined: '❔',
            "null": '⭕',
            "true": '✔',
            "false": '❌'
        };
        return states['' + state];
    };
    QrCodeComponent.prototype.abrirUrl = function () {
        window.open(this.qrResultString, "_self");
    };
    __decorate([
        core_1.ViewChild('scanner', { static: false })
    ], QrCodeComponent.prototype, "scanner");
    QrCodeComponent = __decorate([
        core_1.Component({
            selector: 'app-qr-code',
            templateUrl: './qr-code.component.html',
            styleUrls: ['./qr-code.component.sass']
        })
    ], QrCodeComponent);
    return QrCodeComponent;
}());
exports.QrCodeComponent = QrCodeComponent;
