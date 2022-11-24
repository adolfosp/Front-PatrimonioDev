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
exports.__esModule = true;
var ngx_easy_table_1 = require("ngx-easy-table");
function default_1() {
    var configuracao = __assign({}, ngx_easy_table_1.DefaultConfig);
    configuracao.columnReorder = false;
    configuracao.fixedColumnWidth = false;
    configuracao.resizeColumn = true;
    configuracao.detailsTemplate = true;
    configuracao.rows = 5;
    return configuracao;
}
exports["default"] = default_1;
;
