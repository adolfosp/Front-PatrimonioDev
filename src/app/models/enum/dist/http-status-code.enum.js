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
exports.httpStatusCodes = exports.HttpStatusCodes500 = exports.HttpStatusCodes400 = exports.HttpStatusCodes300 = exports.HttpStatusCodes200 = exports.HttpStatusCodes100 = void 0;
var HttpStatusCodes100;
(function (HttpStatusCodes100) {
    HttpStatusCodes100[HttpStatusCodes100["CONTINUE"] = 100] = "CONTINUE";
    HttpStatusCodes100[HttpStatusCodes100["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
    HttpStatusCodes100[HttpStatusCodes100["PROCESSING"] = 102] = "PROCESSING";
    HttpStatusCodes100[HttpStatusCodes100["EARLY_HINTS"] = 103] = "EARLY_HINTS";
})(HttpStatusCodes100 = exports.HttpStatusCodes100 || (exports.HttpStatusCodes100 = {}));
var HttpStatusCodes200;
(function (HttpStatusCodes200) {
    HttpStatusCodes200[HttpStatusCodes200["OK"] = 200] = "OK";
    HttpStatusCodes200[HttpStatusCodes200["CREATED"] = 201] = "CREATED";
    HttpStatusCodes200[HttpStatusCodes200["ACCEPTED"] = 202] = "ACCEPTED";
    HttpStatusCodes200[HttpStatusCodes200["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
    HttpStatusCodes200[HttpStatusCodes200["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpStatusCodes200[HttpStatusCodes200["RESET_CONTENT"] = 205] = "RESET_CONTENT";
    HttpStatusCodes200[HttpStatusCodes200["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
    HttpStatusCodes200[HttpStatusCodes200["MULTISTATUS"] = 207] = "MULTISTATUS";
    HttpStatusCodes200[HttpStatusCodes200["ALREADY_REPORTED"] = 208] = "ALREADY_REPORTED";
    HttpStatusCodes200[HttpStatusCodes200["IM_USED"] = 226] = "IM_USED";
})(HttpStatusCodes200 = exports.HttpStatusCodes200 || (exports.HttpStatusCodes200 = {}));
var HttpStatusCodes300;
(function (HttpStatusCodes300) {
    HttpStatusCodes300[HttpStatusCodes300["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
    HttpStatusCodes300[HttpStatusCodes300["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
    HttpStatusCodes300[HttpStatusCodes300["FOUND"] = 302] = "FOUND";
    HttpStatusCodes300[HttpStatusCodes300["SEE_OTHER"] = 303] = "SEE_OTHER";
    HttpStatusCodes300[HttpStatusCodes300["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    HttpStatusCodes300[HttpStatusCodes300["USE_PROXY"] = 305] = "USE_PROXY";
    HttpStatusCodes300[HttpStatusCodes300["SWITCH_PROXY"] = 306] = "SWITCH_PROXY";
    HttpStatusCodes300[HttpStatusCodes300["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
    HttpStatusCodes300[HttpStatusCodes300["PERMANENT_REDIRECT"] = 308] = "PERMANENT_REDIRECT";
})(HttpStatusCodes300 = exports.HttpStatusCodes300 || (exports.HttpStatusCodes300 = {}));
var HttpStatusCodes400;
(function (HttpStatusCodes400) {
    HttpStatusCodes400[HttpStatusCodes400["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCodes400[HttpStatusCodes400["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatusCodes400[HttpStatusCodes400["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    HttpStatusCodes400[HttpStatusCodes400["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatusCodes400[HttpStatusCodes400["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatusCodes400[HttpStatusCodes400["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    HttpStatusCodes400[HttpStatusCodes400["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
    HttpStatusCodes400[HttpStatusCodes400["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
    HttpStatusCodes400[HttpStatusCodes400["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
    HttpStatusCodes400[HttpStatusCodes400["CONFLICT"] = 409] = "CONFLICT";
    HttpStatusCodes400[HttpStatusCodes400["GONE"] = 410] = "GONE";
    HttpStatusCodes400[HttpStatusCodes400["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
    HttpStatusCodes400[HttpStatusCodes400["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
    HttpStatusCodes400[HttpStatusCodes400["PAYLOAD_TOO_LARGE"] = 413] = "PAYLOAD_TOO_LARGE";
    HttpStatusCodes400[HttpStatusCodes400["URI_TOO_LONG"] = 414] = "URI_TOO_LONG";
    HttpStatusCodes400[HttpStatusCodes400["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
    HttpStatusCodes400[HttpStatusCodes400["RANGE_NOT_SATISFIABLE"] = 416] = "RANGE_NOT_SATISFIABLE";
    HttpStatusCodes400[HttpStatusCodes400["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
    HttpStatusCodes400[HttpStatusCodes400["MISDIRECTED_REQUEST"] = 421] = "MISDIRECTED_REQUEST";
    HttpStatusCodes400[HttpStatusCodes400["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    HttpStatusCodes400[HttpStatusCodes400["LOCKED"] = 423] = "LOCKED";
    HttpStatusCodes400[HttpStatusCodes400["FAILE_DDEPENDENCY"] = 424] = "FAILE_DDEPENDENCY";
    HttpStatusCodes400[HttpStatusCodes400["UPGRADE_REQUIRED"] = 426] = "UPGRADE_REQUIRED";
    HttpStatusCodes400[HttpStatusCodes400["PRECONDITION_REQUIRED"] = 428] = "PRECONDITION_REQUIRED";
    HttpStatusCodes400[HttpStatusCodes400["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    HttpStatusCodes400[HttpStatusCodes400["REQUEST_HEADER_FIELDS_TOO_LARGE"] = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE";
    HttpStatusCodes400[HttpStatusCodes400["UNAVAILABLE_FOR_LEGAL_REASONS"] = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS";
})(HttpStatusCodes400 = exports.HttpStatusCodes400 || (exports.HttpStatusCodes400 = {}));
var HttpStatusCodes500;
(function (HttpStatusCodes500) {
    HttpStatusCodes500[HttpStatusCodes500["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HttpStatusCodes500[HttpStatusCodes500["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    HttpStatusCodes500[HttpStatusCodes500["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    HttpStatusCodes500[HttpStatusCodes500["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    HttpStatusCodes500[HttpStatusCodes500["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
    HttpStatusCodes500[HttpStatusCodes500["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
    HttpStatusCodes500[HttpStatusCodes500["VARIANT_ALSO_NEGOTIATES"] = 506] = "VARIANT_ALSO_NEGOTIATES";
    HttpStatusCodes500[HttpStatusCodes500["INSUFFICIENT_STORAGE"] = 507] = "INSUFFICIENT_STORAGE";
    HttpStatusCodes500[HttpStatusCodes500["LOOP_DETECTED"] = 508] = "LOOP_DETECTED";
    HttpStatusCodes500[HttpStatusCodes500["NOT_EXTENDED"] = 510] = "NOT_EXTENDED";
    HttpStatusCodes500[HttpStatusCodes500["NETWORK_AUTHENTICATION_REQUIRED"] = 511] = "NETWORK_AUTHENTICATION_REQUIRED";
})(HttpStatusCodes500 = exports.HttpStatusCodes500 || (exports.HttpStatusCodes500 = {}));
exports.httpStatusCodes = __assign(__assign(__assign(__assign(__assign({}, HttpStatusCodes100), HttpStatusCodes200), HttpStatusCodes300), HttpStatusCodes400), HttpStatusCodes500);
