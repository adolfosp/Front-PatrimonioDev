"use strict";
exports.__esModule = true;
exports.CustomPreloader = void 0;
var rxjs_1 = require("rxjs");
var CustomPreloader = /** @class */ (function () {
    function CustomPreloader() {
    }
    CustomPreloader.prototype.preload = function (route, load) {
        return route.data && route.data['preload'] ? load() : rxjs_1.of(null);
    };
    return CustomPreloader;
}());
exports.CustomPreloader = CustomPreloader;
